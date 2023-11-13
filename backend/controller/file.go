package controller

import (
	"fmt"
	"mime/multipart"
	"net/http"
	"time"

	"github.com/gabriel-vasile/mimetype"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

type CreateFileReq struct {
	File     *multipart.FileHeader `form:"file" binding:"required"`
	Name     string                `form:"name" binding:"required"`
	LocateAt string                `form:"locateAt"`
}

func (s Controller) CreateFile(ctx *gin.Context) {
	var params CreateFileReq
	if err := ctx.ShouldBindWith(&params, binding.FormMultipart); err != nil {
		_ = ctx.AbortWithError(http.StatusBadRequest, ErrInvalidRequest)
		return
	}

	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}
	locateAt, err := util.ParseUUID(params.LocateAt)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrLocateAtFailed))
		return
	}

	prefix := fmt.Sprintf("%s/files", userId)

	signedUrl, httpStatus, err := util.UploadFile(ctx, s.BucketHandler, prefix)
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
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
		tx.Commit(ctx)
	}()

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
}

func (s Controller) GetFile(ctx *gin.Context) {
	fileIdFromParam := ctx.Param("id")
	if fileIdFromParam == "" {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrInvalidRequest))
		return
	}

	fileId, err := util.ParseUUID(fileIdFromParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrFileIdInvalid))
		return
	}

	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	conn, err := s.Pool.Acquire(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	q := db.New(conn)
	defer conn.Release()

	arg := db.GetFileParams{
		ID:     fileId,
		UserID: userId,
	}

	file, err := q.GetFile(ctx, arg)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	buffer, err := util.DownLoadFile(file.Url)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	mimetype := mimetype.Detect(buffer)
	ctx.Header("Cache-Control", "max-age=31536000")
	ctx.Data(http.StatusOK, mimetype.String(), buffer)
}

type GetFileDescriptionReq struct {
	ID string `uri:"id" binding:"required"`
}

func (s Controller) GetFileDescription(ctx *gin.Context) {
	var params GetFileDescriptionReq

	if err := ctx.ShouldBindUri(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	fileId, err := uuid.Parse(params.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(ErrAuthFailed))
		return
	}

	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	conn, err := s.Pool.Acquire(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	q := db.New(conn)
	defer conn.Release()

	arg := db.GetFileParams{
		ID:     fileId,
		UserID: userId,
	}

	file, err := q.GetFile(ctx, arg)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"description": file.Description})
}

type UpdateFileReq struct {
	ID          string `json:"id" binding:"required"`
	Description string `json:"description"`
}

func (s Controller) UpdateFileDescription(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	var params UpdateFileReq

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	fileId, err := uuid.Parse(params.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(ErrAuthFailed))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	q := db.New(tx)
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
		tx.Commit(ctx)
	}()

	err = q.UpdateFileDescription(ctx, db.UpdateFileDescriptionParams{
		ID:          fileId,
		UserID:      userId,
		Description: &params.Description,
	})

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": fileId})
}

type UpdateFileNameReq struct {
	ID   string `json:"id" binding:"required"`
	Name string `json:"name" binding:"required"`
}

func (s Controller) UpdateFileName(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	var params UpdateFileNameReq

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	fileId, err := uuid.Parse(params.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(ErrAuthFailed))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	q := db.New(tx)
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
		tx.Commit(ctx)
	}()

	RenamedFolder, err := q.RenameFile(ctx, db.RenameFileParams{
		ID:             fileId,
		UserID:         userId,
		Name:           params.Name,
		LastModifiedAt: time.Now(),
	})

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": RenamedFolder.ID, "name": RenamedFolder.Name})
}
