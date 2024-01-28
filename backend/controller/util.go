package controller

import (
	"errors"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/minio/minio-go/v7"
)

type EmailSetting struct {
	SecretKey     string
	AppPassword   string
	EncryptSecret string
}

type Controller struct {
	Pool          *pgxpool.Pool
	SecretKey     string
	BucketHandler *minio.Client
	BucketName    string
	AppPassword   string
	EncryptSecret string
}

var (
	ErrAlreadyExist = errors.New("no rows in result set")
)

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
