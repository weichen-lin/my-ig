package controller

import (
	"cloud.google.com/go/storage"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Controller struct {
	Pool          *pgxpool.Pool
	SecretKey     string
	BucketHandler *storage.BucketHandle
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
