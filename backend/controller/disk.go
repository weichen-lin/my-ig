package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

func (s *Controller) GetDisk(ctx *gin.Context) {
	id_from_param := ctx.Param("id")

	locateAt, err := util.ParseUUID(id_from_param)
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

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	q := db.New(tx)
	
	files, err := q.SelectFiles(ctx, db.SelectFilesParams{
		UserID:   userId,
		LocateAt: locateAt,
	})

	folders, err := q.SelectFolders(ctx, db.SelectFoldersParams{
		UserID:   userId,
		LocateAt: locateAt,
	})

	ctx.JSON(http.StatusOK, gin.H{
		"files":   files,
		"folders": folders,
	})
}
