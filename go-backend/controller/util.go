package controller

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	Conn *sql.DB
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
