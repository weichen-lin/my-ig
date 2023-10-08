package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"net/mail"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

const (
	maxFileSize   = 10 << 20 // 10MB
	userTokenName = "token"
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

func (s *Controller) ValiedateToken(ctx *gin.Context) {
	cookie, err := ctx.Cookie(userTokenName)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	jwtMaker, err := util.NewJWTMaker(s.SecretKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	_, err = jwtMaker.VerifyToken(cookie)
	if err != nil {
		ctx.Header("Set-Cookie", "token="+""+"; Path=/; HttpOnly")
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	ctx.String(http.StatusOK, cookie)
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
	ctx.String(http.StatusOK, user.ID.String())
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
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	err = util.ComparePassword(info.Password, params.Password)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
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
}

func (s *Controller) UploadAvatar(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	fullName := fmt.Sprintf("%s/avatar", userId)

	signedUrl, httpStatus, err := util.UploadFile(ctx, s.BucketHandler, fullName)
	if err != nil {
		ctx.JSON(httpStatus, errorResponse(err))
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

	err = tx.Commit(ctx)
	if err != nil {
		tx.Rollback(ctx)
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, signedUrl)
}

func (s *Controller) GetUserInfo(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
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
			ctx.JSON(http.StatusNotFound, errorResponse(ErrUserNotFound))
			return
		}
		ctx.JSON(http.StatusNotFound, errorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (s *Controller) UserLogout(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	_, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}
	ctx.Header("Set-Cookie", "token="+""+"; Path=/; HttpOnly")
	ctx.JSON(http.StatusOK, "logout success")
}
