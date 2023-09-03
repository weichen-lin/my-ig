package controller

import (
	"database/sql"
	"net/http"
	"net/mail"

	"github.com/gin-gonic/gin"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

type CreateUserParams struct {
	Email    string `json:"email" binding:"required"`
	Name string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (s *Server) Createuser(ctx *gin.Context) {
	var params CreateUserParams

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadGateway, errorResponse(err))
		return
	}

	tx := db.NewTransaction(s.Conn)

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

	arg := db.CreateUserParams{
		Email:   params.Email,
		Name: params.Name,
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
	}

	ctx.JSON(http.StatusOK, user)
}