package util

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"path"

	"github.com/gabriel-vasile/mimetype"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
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

type MinioConfig struct {
	BucketName      string
	Endpoint        string
	AccessKeyID     string
	SecretAccessKey string
	UseSSL          bool
}

func NewMinioClient(config *MinioConfig) (*minio.Client, error) {
	minioClient, err := minio.New(config.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(config.AccessKeyID, config.SecretAccessKey, ""),
		Secure: config.UseSSL,
	})

	exists, err := minioClient.BucketExists(context.Background(), config.BucketName)
	if err != nil {
		return nil, err
	}

	if !exists {
		err := minioClient.MakeBucket(context.Background(), config.BucketName, minio.MakeBucketOptions{})
		if err != nil {
			return nil, err
		}
	}

	return minioClient, nil
}

func UploadFile(ctx *gin.Context, minioClient *minio.Client, bucketName string, prefix string) (string, int, error) {
	uploadFile, err := ctx.FormFile("file")

	if uploadFile == nil || err != nil {
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

	ext := mtype.Extension()

	if !ArrayContains(ImageTypes, mtype.String()) {
		return "", http.StatusBadRequest, fmt.Errorf("file type not supported")
	}

	// UPLOAD FILE TO Minio
	fileId := uuid.New().String()
	fullPath := path.Join(prefix, fileId+ext)

	_, err = minioClient.PutObject(ctx, bucketName, fullPath, bytes.NewReader(fileBytes), uploadFile.Size, minio.PutObjectOptions{
		ContentType: mtype.String(),
	})

	if err != nil {
		fmt.Println(err)
		return "", http.StatusBadRequest, fmt.Errorf("upload file error")
	}

	return fullPath, http.StatusOK, nil
}

func GetFileFromBucket(ctx *gin.Context, minioClient *minio.Client, bucketName string, filePath string) ([]byte, int, error) {
	obj, err := minioClient.GetObject(ctx, bucketName, filePath, minio.GetObjectOptions{})
	if err != nil {
		return nil, http.StatusBadRequest, fmt.Errorf("get file error")
	}

	fileBytes, err := io.ReadAll(obj)
	if err != nil {
		return nil, http.StatusBadRequest, fmt.Errorf("read file error")
	}

	return fileBytes, http.StatusOK, nil
}

func DownLoadFile(url string) ([]byte, error) {
	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return nil, err
	}

	resData, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	return resData, nil
}
