package controller

import (
	"errors"

	"cloud.google.com/go/storage"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type EmailSetting struct {
	SecretKey     string
	AppPassword   string
	EncryptSecret string
}

type Controller struct {
	Pool          *pgxpool.Pool
	SecretKey     string
	BucketHandler *storage.BucketHandle
	AppPassword   string
	EncryptSecret string
}

var (
	ErrAlreadyExist = errors.New("no rows in result set")
)

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
