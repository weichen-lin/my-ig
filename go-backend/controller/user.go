package controller

import (
	"database/sql"
	"fmt"
	"io"
	"net/http"
	"net/mail"
	"time"

	"github.com/gabriel-vasile/mimetype"
	"github.com/gin-gonic/gin"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

var (
	ErrUserAlreadyExist = fmt.Errorf("User already exists!")
	ErrEmailInvalid     = fmt.Errorf("Email is invalid!")
)

var (
	ImageTypes = []string{
		"image/jpeg",
		"image/png",
		"image/gif",
	}
)

const (
	maxFileSize = 10 << 20 // 10MB
)

type UserRegisterParams struct {
	Email    string `json:"email" binding:"required"`
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func ArrayContains(arr []string, target string) bool {
	for _, a := range arr {
		if a == target {
			return true
		}
	}
	return false
}

func (s *Controller) UserRegister(ctx *gin.Context) {
	var params UserRegisterParams

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	hashedPassword, err := util.HashPassword(params.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	_, err = mail.ParseAddress(params.Email)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrEmailInvalid))
		return
	}

	tx := db.NewTransaction(s.Conn)

	arg := db.CreateUserParams{
		Email:    params.Email,
		Name:     params.Name,
		Password: hashedPassword,
	}

	var user db.User

	createUserErr := tx.ExecTx(ctx, func(tx *sql.Tx) error {
		var err error
		q := db.New(tx)

		_, err = q.GetUserByEmail(ctx, params.Email)
		if err == nil {
			return ErrUserAlreadyExist
		}

		user, err = q.CreateUser(ctx, arg)
		return err
	}, false)

	switch createUserErr {
	case ErrUserAlreadyExist:
		ctx.JSON(http.StatusConflict, errorResponse(createUserErr))
		return
	case nil:
		break
	default:
		ctx.JSON(http.StatusInternalServerError, errorResponse(createUserErr))
		return
	}

	jwtMaker, err := util.NewJWTMaker(s.SecretKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	token, err := jwtMaker.CreateToken(user.ID.String(), time.Now().Add(time.Hour*24*3))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.Header("Set-Cookie", "token="+token+"; Path=/; HttpOnly")
	ctx.JSON(http.StatusOK, user.ID)
	return
}

type UserLoginParams struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (s *Controller) UserLogin(ctx *gin.Context) {
	var params UserRegisterParams

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	// tx := db.NewTransaction(s.Conn)
}

func (s *Controller) UploadAvatar(ctx *gin.Context) {
	uploadFile, err := ctx.FormFile("file")

	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	if uploadFile.Size > maxFileSize {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("file size too large")))
		return
	}

	file, err := uploadFile.Open()
	defer file.Close()

	fileBytes := make([]byte, uploadFile.Size)

	_, err = io.ReadFull(file, fileBytes)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("read file error")))
		return
	}

	mtype := mimetype.Detect(fileBytes)

	if !ArrayContains(ImageTypes, mtype.String()) {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("file type not supported")))
		return
	}

	ctx.JSON(http.StatusOK, "OK")
}
