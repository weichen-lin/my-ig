package controller

import (
	"bytes"
	"database/sql"
	"fmt"
	"io"
	"net/http"
	"net/mail"
	"net/url"
	"time"

	"cloud.google.com/go/storage"
	"github.com/gabriel-vasile/mimetype"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	q := db.New(tx)

	arg := db.CreateUserParams{
		Email:    params.Email,
		Name:     params.Name,
		Password: hashedPassword,
	}

	_, err = q.GetUserByEmail(ctx, params.Email)
	if err == nil {
		ctx.JSON(http.StatusConflict, errorResponse(ErrUserAlreadyExist))
		return
	}

	user, err := q.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	
	err = tx.Commit(ctx)
	if err != nil {
		tx.Rollback(ctx)
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
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

func (s *Controller) UserLogin(ctx *gin.Context) {
	var params db.GetUserParams

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	q := db.New(tx)

	info, err := q.GetUserByEmail(ctx, params.Email)
	if err == sql.ErrNoRows || err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

	err = util.ComparePassword(info.Password, params.Password)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

	jwtMaker, err := util.NewJWTMaker(s.SecretKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	token, err := jwtMaker.CreateToken(info.ID.String(), time.Now().Add(time.Hour*24*3))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.Header("Set-Cookie", "token="+token+"; Path=/; HttpOnly")
	ctx.JSON(http.StatusOK, info.ID)
	return
}

func (s *Controller) UploadAvatar(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

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

	// UPLOAD FILE TO FIREBASE
	obj := s.BucketHandler.Object(uploadFile.Filename)
	writer := obj.NewWriter(ctx)

	defer writer.Close()

	if _, err := io.Copy(writer, bytes.NewReader(fileBytes)); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("upload failed")))
	}

	// GET SIGNED URL
	opts := &storage.SignedURLOptions{
		Method:  "GET",
		Expires: time.Now().AddDate(100, 0, 0),
	}

	signedUrl, err := s.BucketHandler.SignedURL(uploadFile.Filename, opts)

	_, urlErr := url.ParseRequestURI(signedUrl)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("get signed url error")))
		return
	}

	if urlErr != nil {
		fmt.Println(urlErr)
		ctx.JSON(http.StatusBadRequest, errorResponse(fmt.Errorf("invaid signed url")))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	q := db.New(tx)

	arg := db.UpdateUserAvatarParams{
		AvatarUrl: &signedUrl,
		ID:        userId,
	}

	err = q.UpdateUserAvatar(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
	}

	ctx.JSON(http.StatusOK, signedUrl)
	return
}

func (s *Controller) GetUserInfo(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	q := db.New(tx)

	user, err := q.GetUserById(ctx, userId)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf("user not found")))
			return
		}
		ctx.JSON(http.StatusNotFound, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, user)
	return
}

func (s *Controller) UserLogout(ctx *gin.Context) {
	ctx.Header("Set-Cookie", "token="+""+"; Path=/; HttpOnly")
	ctx.JSON(http.StatusOK, "logout success")
	return
}
