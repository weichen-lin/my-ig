package controller

import (
	"database/sql"

	"cloud.google.com/go/storage"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	Conn          *sql.DB
	SecretKey     string
	BucketHandler *storage.BucketHandle
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
