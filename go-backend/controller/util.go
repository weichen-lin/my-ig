package controller

import (
	"database/sql"

	firebase "firebase.google.com/go"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	Conn      *sql.DB
	SecretKey string
	App       *firebase.App
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
