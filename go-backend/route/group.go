package route

import (
	"context"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"

	"github.com/weichen-lin/myig/controller"
	"github.com/weichen-lin/myig/util"
)

func PathRoute(r *gin.Engine) *gin.Engine {

	config, err := util.Loadconfig(".", "test")
	if err != nil {
		panic(err)
	}

	conn, err := pgx.Connect(context.Background(), config.DBSource)
	if err != nil {
		panic(err)
	}

	bucketHandler, err := util.GetFirebase()
	if err != nil {
		panic(err)
	}

	ctl := controller.Controller{Conn: conn, SecretKey: config.SecretKey, BucketHandler: bucketHandler}

	user := r.Group("/user")

	user.GET("/info", ctl.AuthMiddleware(), ctl.GetUserInfo)
	user.POST("/register", ctl.UserRegister)
	user.POST("/login", ctl.UserLogin)
	user.POST("/avatar", ctl.AuthMiddleware(), ctl.UploadAvatar)

	return r
}
