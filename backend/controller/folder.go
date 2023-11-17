package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
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
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
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
	defer func() {
		if err != pgx.ErrNoRows && err != nil {
			tx.Rollback(ctx)
		}
		tx.Commit(ctx)
	}()

	locateAt, err := util.ParseUUID(params.LocateAt)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrLocateAtFailed))
		return
	}

	var depth int32 = 1

	if locateAt != uuid.Nil {
		folderLocateAt, err := q.GetFolder(ctx, locateAt)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(err))
			return
		}
		locateAt = folderLocateAt.ID
		depth = folderLocateAt.Depth + 1
	}

	_, err = q.CheckFolderExist(ctx, db.CheckFolderExistParams{
		LocateAt: locateAt,
		Name:     params.Name,
		UserID:   userId,
	})

	if err != nil {
		folder, err := q.CreateFolderWithFullPath(ctx, db.CreateFolderParams{
			Name:     params.Name,
			LocateAt: locateAt,
			UserID:   userId,
			Depth:    depth,
		})

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(ErrFolderNotExist))
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
}

type UpdateFolderReq struct {
	ID   string `json:"id" binding:"required"`
	Name string `json:"name" binding:"required"`
}

func (s *Controller) UpdateFolderName(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
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
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
		tx.Commit(ctx)
	}()

	folder, err := q.GetFolder(ctx, folderId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	if folder.UserID != userId {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
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

	ctx.JSON(http.StatusOK, gin.H{"id": folder.ID, "name": params.Name})
}

func (s *Controller) GetBreadCrumbs(ctx *gin.Context) {
	id_from_param := ctx.DefaultQuery("id", "")

	folderId, err := util.ParseUUID(id_from_param)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrFolderIdInvalid))
		return
	}

	id_from_ctx := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id_from_ctx)
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

	folder, err := q.GetFolder(ctx, folderId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	if folder.UserID != userId {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	ctx.JSON(http.StatusOK, folder.FullPath)
}

type DeleteFolderReq struct {
	IDs []string `json:"ids" binding:"required"`
}

func (s *Controller) DeleteFolders(ctx *gin.Context) {
	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
		return
	}

	var params DeleteFolderReq

	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	idsToUUIDs := make([]uuid.UUID, len(params.IDs))
	for i, id := range params.IDs {
		uuid, err := uuid.Parse(id)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(err))
			return
		}
		idsToUUIDs[i] = uuid
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

	err = q.UpdateFoldersDeleted(ctx, db.UpdateFoldersDeletedParams{
		Ids:    idsToUUIDs,
		UserID: userId,
	})

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, "success")
}

func (s *Controller) GetFolderList(ctx *gin.Context) {
	f := ctx.DefaultQuery("p", "")
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

	offset, err := strconv.ParseInt(f, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	
	folders, err := q.SelectAllFoldersWithOffset(ctx, db.SelectAllFoldersWithOffsetParams{
		UserID: userId,
		Offset: int32(offset),
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, folders)
}