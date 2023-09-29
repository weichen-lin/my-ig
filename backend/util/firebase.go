package util

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"github.com/gabriel-vasile/mimetype"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
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

func ArrayContains(arr []string, target string) bool {
	for _, a := range arr {
		if a == target {
			return true
		}
	}
	return false
}

func GetFirebase(bucketName string) (*storage.BucketHandle, error) {
	opt := option.WithCredentialsFile("./credential.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing at firebase Newapp: %v", err)
	}

	client, err := app.Storage(context.Background())
	if err != nil || client == nil {
		return nil, fmt.Errorf("error initializing at firebase Storage: %v", err)
	}

	bucketHandler, err := client.Bucket(bucketName)

	return bucketHandler, nil
}

func UploadFile(ctx *gin.Context, bucket *storage.BucketHandle, path string) (string, int, error) {
	uploadFile, err := ctx.FormFile("file")

	if uploadFile == nil {
		return "", http.StatusBadRequest, fmt.Errorf("file not found")
	}

	if uploadFile.Size > maxFileSize {
		return "", http.StatusBadRequest, fmt.Errorf("file size too large")
	}

	file, err := uploadFile.Open()
	defer file.Close()

	fileBytes := make([]byte, uploadFile.Size)

	_, err = io.ReadFull(file, fileBytes)
	if err != nil {
		return "", http.StatusBadRequest, fmt.Errorf("read file error")
	}

	mtype := mimetype.Detect(fileBytes)

	if !ArrayContains(ImageTypes, mtype.String()) {
		return "", http.StatusBadRequest, fmt.Errorf("file type not supported")
	}

	// UPLOAD FILE TO FIREBASE
	fullName := path + "/" + uploadFile.Filename
	obj := bucket.Object(fullName)
	writer := obj.NewWriter(ctx)

	defer writer.Close()

	if _, err := io.Copy(writer, bytes.NewReader(fileBytes)); err != nil {
		return "", http.StatusBadRequest, fmt.Errorf("upload failed")
	}

	// GET SIGNED URL
	opts := &storage.SignedURLOptions{
		Method:  "GET",
		Expires: time.Now().AddDate(100, 0, 0),
	}

	signedUrl, err := bucket.SignedURL(uploadFile.Filename, opts)

	_, urlErr := url.ParseRequestURI(signedUrl)

	if err != nil {
		return "", http.StatusBadRequest, fmt.Errorf("get signed url error")
	}

	if urlErr != nil {
		return "", http.StatusBadRequest, fmt.Errorf("invaid signed url")
	}
	return signedUrl, http.StatusOK, nil
}
