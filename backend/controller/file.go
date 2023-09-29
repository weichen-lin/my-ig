package controller

import (
	"fmt"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

type CreateFileReq struct {
	File     *multipart.FileHeader `form:"file" binding:"required"`
	Name     string                `form:"name" binding:"required"`
	LocateAt string                `form:"locateAt" binding:"required"`
}

func (s Controller) CreateFile(ctx *gin.Context) {
	var params CreateFileReq
	if err := ctx.ShouldBindWith(&params, binding.FormMultipart); err != nil {
		_ = ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("invalid request"))
		return
	}

	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

	locateAt, err := util.ParseLocateAt(params.LocateAt)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("locate at failed")))
		return
	}

	fullName := fmt.Sprintf("%s/files", userId)

	signedUrl, httpStatus, err := util.UploadFile(ctx, s.BucketHandler, fullName)
	if err != nil {
		ctx.JSON(httpStatus, errorResponse(err))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	q := db.New(tx)

	arg := db.CreateFileParams{
		Url:      signedUrl,
		Name:     params.Name,
		UserID:   userId,
		LocateAt: locateAt,
	}

	file, err := q.CreateFile(ctx, arg)
	if err != nil {
		_ = tx.Rollback(ctx)
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	err = tx.Commit(ctx)
	if err != nil {
		_ = tx.Rollback(ctx)
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"id": file.ID})
	return
}
