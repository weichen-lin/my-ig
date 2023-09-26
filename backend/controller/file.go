package controller

import (
	"fmt"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

type CreateFileReq struct {
	File *multipart.FileHeader `form:"file" binding:"required"`
	Name string `form:"name" binding:"required"`
	LocateAt string `form:"locateAt" binding:"required"`
}

func (s Controller) CreateFile (ctx *gin.Context){
	var params CreateFileReq
	if err := ctx.ShouldBindWith(&params, binding.FormMultipart); err != nil {
        _ = ctx.AbortWithError(http.StatusBadRequest, err)
        return
    }
    fmt.Printf(params.File.Filename)
    fmt.Printf(params.Name)
    fmt.Printf(params.LocateAt)
	ctx.JSON(http.StatusOK, "OK")

	// id := ctx.Value("userId").(string)

	// userId, err := uuid.Parse(id)
	// if err != nil {
	// 	ctx.JSON(http.StatusUnauthorized, errorResponse(fmt.Errorf("Authorization failed")))
	// 	return
	// }

	// signedUrl, httpStatus, err := util.UploadFile(ctx, s.BucketHandler)
	// if err != nil {
	// 	ctx.JSON(httpStatus, errorResponse(err))
	// 	return
	// }

	// tx, err := s.Pool.Begin(ctx)
	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, errorResponse(err))
	// 	return
	// }
	// q := db.New(tx)

	// arg := db.CreateFileParams{
	// 	Url: &signedUrl,
	// 	ID:        userId,
	// }

	// file, err := q.CreateFile(ctx, db.CreateFileParams{)
}