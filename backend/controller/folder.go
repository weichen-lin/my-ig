package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
)

var (
	ErrFolderAlreadyExist = fmt.Errorf("folder already exists!")
	ErrFolderNotExist     = fmt.Errorf("parent folder not exists!")
)

type CreateFolderReq struct {
	Name     string `json:"name" binding:"required"`
	LocateAt string `json:"locateAt"`
}

type CreateFolderResponse struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

func (s *Controller) CreateFolder(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

	var params CreateFolderReq

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	q := db.New(tx)

	_, err = uuid.Parse(params.LocateAt)
	var currentFolderId uuid.UUID

	var depth int32

	if err != nil {
		currentFolderId = userId
		depth = 1
	} else {
		currentFolderId = uuid.MustParse(params.LocateAt)
		parentFolder, err := q.GetFolder(ctx, currentFolderId)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(err))
			return
		}
		depth = parentFolder.Depth + 1
	}

	_, err = q.CheckFolderExist(ctx, db.CheckFolderExistParams{
		LocateAt: currentFolderId,
		Name:     params.Name,
		UserID:   userId,
	})

	if err != nil {
		folder, err := db.CreateFolderWithFullPath(ctx, q, db.CreateFolderParams{
			Name:     params.Name,
			LocateAt: currentFolderId,
			UserID:   userId,
			Depth:    depth,
		})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(ErrFolderNotExist))
			return
		}

		err = tx.Commit(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			tx.Rollback(ctx)
			return
		}

		ctx.JSON(http.StatusOK, CreateFolderResponse{
			ID:   folder.ID,
			Name: folder.Name,
		})

	} else {
		ctx.JSON(http.StatusConflict, errorResponse(ErrFolderAlreadyExist))
		return
	}

	return
}

type UpdateFolderReq struct {
	ID   string `json:"id" binding:"required"`
	Name string `json:"name" binding:"required"`
}

func (s *Controller) UpdateFolderName(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

	var params UpdateFolderReq

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	folderId, err := uuid.Parse(params.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	q := db.New(tx)

	folder, err := q.GetFolder(ctx, folderId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	if folder.UserID != userId {
		ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
		return
	}

	if folder.Name == params.Name {
		ctx.JSON(http.StatusConflict, errorResponse(ErrFolderAlreadyExist))
		return
	}

	_, err = q.UpdateFolderName(ctx, db.UpdateFolderNameParams{
		ID:             folderId,
		Name:           params.Name,
		LastModifiedAt: time.Now(),
	})

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	err = tx.Commit(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		tx.Rollback(ctx)
		return
	}

	ctx.JSON(http.StatusOK, "success")
}

type DeleteFolderReq struct {
	ID string `json:"id" binding:"required"`
}

type MoveFolderReq struct {
	ID       string `json:"id" binding:"required"`
	LocateAt string `json:"locateAt" binding:"required"`
}
