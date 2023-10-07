package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
	"github.com/weichen-lin/myig/util"
)

func (s *Controller) GetDisk(ctx *gin.Context) {
	id_from_param := ctx.Param("f")

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

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	q := db.New(tx)
}