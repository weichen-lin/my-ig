package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

func (s *Controller) GetDisk(ctx *gin.Context) {
	f := ctx.DefaultQuery("f", "")

	locateAt, err := util.ParseUUID(f)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrFolderIdInvalid))
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

	files, err := q.SelectFiles(ctx, db.SelectFilesParams{
		UserID:   userId,
		LocateAt: locateAt,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	folders, err := q.SelectFolders(ctx, db.SelectFoldersParams{
		UserID:   userId,
		LocateAt: locateAt,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"files":   files,
		"folders": folders,
	})
}

type DeleteFilesAndFoldersParams struct {
	FileIDs   []string `json:"fileIds"`
	FolderIDs []string `json:"folderIds"`
}

func (s *Controller) DeleteFilesAndFolders(ctx *gin.Context) {
	var params DeleteFilesAndFoldersParams
	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrInvalidRequest))
		return
	}

	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
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

	folderIdsToUUIDs := make([]uuid.UUID, len(params.FolderIDs))
	for i, id := range params.FolderIDs {
		uuid, err := uuid.Parse(id)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(err))
			return
		}
		folderIdsToUUIDs[i] = uuid
	}

	fileIdsToUUIDs := make([]uuid.UUID, len(params.FileIDs))
	for i, id := range params.FileIDs {
		uuid, err := uuid.Parse(id)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(err))
			return
		}
		fileIdsToUUIDs[i] = uuid
	}

	err = q.UpdateFilesDeleted(ctx, db.UpdateFilesDeletedParams{
		Ids:    fileIdsToUUIDs,
		UserID: userId,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	err = q.UpdateFoldersDeleted(ctx, db.UpdateFoldersDeletedParams{
		Ids:    folderIdsToUUIDs,
		UserID: userId,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, "success")
}

type MoveFilesAndFoldersParams struct {
	FileIDs   []string `json:"fileIds"`
	FolderIDs []string `json:"folderIds"`
	TargetID  string   `json:"targetId"`
}

func (s *Controller) MoveFilesAndFolders(ctx *gin.Context) {
	var params MoveFilesAndFoldersParams
	if err := ctx.ShouldBindJSON(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(ErrInvalidRequest))
		return
	}

	id := ctx.Value("userId").(string)

	userId, err := uuid.Parse(id)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
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

	folderIdsToUUIDs := make([]uuid.UUID, len(params.FolderIDs))
	for i, id := range params.FolderIDs {
		uuid, err := uuid.Parse(id)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(err))
			return
		}
		folderIdsToUUIDs[i] = uuid
	}

	fileIdsToUUIDs := make([]uuid.UUID, len(params.FileIDs))
	for i, id := range params.FileIDs {
		uuid, err := uuid.Parse(id)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, errorResponse(err))
			return
		}
		fileIdsToUUIDs[i] = uuid
	}

	targetIdToUUID, err := uuid.Parse(params.TargetID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	
	err = q.MoveFoldersWithIds(ctx, db.MoveFolderWithIdsParams{
		Ids:    fileIdsToUUIDs,
		UserID: userId,
		MoveTo: targetIdToUUID,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	err = q.MoveFileWithIds(ctx, db.MoveFileWithIdsParams{
		Ids:    fileIdsToUUIDs,
		UserID: userId,
		MoveTo: targetIdToUUID,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, "success")
}