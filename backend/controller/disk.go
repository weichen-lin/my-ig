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
	
	q := db.New(conn)
	defer conn.Release()
	
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
