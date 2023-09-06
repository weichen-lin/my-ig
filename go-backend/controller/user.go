package controller

import (
	"database/sql"
	"net/http"
	"net/mail"

	"github.com/gin-gonic/gin"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

type UserRegisterParams struct {
	Email    string `json:"email" binding:"required"`
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UserController struct {
	Conn *sql.DB
}

func (s *UserController) UserRegister(ctx *gin.Context) {
	var params UserRegisterParams

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	hashedPassword, hashedPwdErr := util.HashPassword(params.Password)
	if hashedPwdErr != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(hashedPwdErr))
		return
	}

	_, EmailErr := mail.ParseAddress(params.Email)
	if EmailErr != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(EmailErr))
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
		user, err = q.CreateUser(ctx, arg)
		return err
	}, false)

	if createUserErr != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(createUserErr))
		return
	}

	ctx.JSON(http.StatusOK, user.ID)
	return
}

type UserLoginParams struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (s *UserController) UserLogin(ctx *gin.Context) {
	var params UserRegisterParams

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// tx := db.NewTransaction(s.Conn)

}
