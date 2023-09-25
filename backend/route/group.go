package route

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/weichen-lin/myig/controller"
	"github.com/weichen-lin/myig/util"
)

func PathRoute(r *gin.Engine) *gin.Engine {

	config, err := util.Loadconfig(".", "test")
	if err != nil {
		panic(err)
	}

	fmt.Println(config)

	pool, err := pgxpool.New(context.Background(), config.DBSource)
	if err != nil {
		panic(err)
	}

	bucketHandler, err := util.GetFirebase(config.FireBaseBucket)
	if err != nil {
		panic(err)
	}

	ctl := controller.Controller{Pool: pool, SecretKey: config.SecretKey, BucketHandler: bucketHandler}

	user := r.Group("/user")
	user.GET("/info", ctl.AuthMiddleware(), ctl.GetUserInfo)
	user.POST("/register", ctl.UserRegister)
	user.POST("/login", ctl.UserLogin)
	user.POST("/avatar", ctl.AuthMiddleware(), ctl.UploadAvatar)
	user.DELETE("/logout", ctl.AuthMiddleware(), ctl.UserLogout)

	folder := r.Group("/folder")
	folder.POST("/create", ctl.AuthMiddleware(), ctl.CreateFolder)
	folder.PATCH("/rename", ctl.AuthMiddleware(), ctl.UpdateFolderName)
	folder.PATCH("/move", ctl.AuthMiddleware(), ctl.MoveFolder)

	return r
}
