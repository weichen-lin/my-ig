package route

import (
	"context"
	"time"

	"github.com/gin-contrib/cors"
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

	pool, err := pgxpool.New(context.Background(), config.DBSource)
	if err != nil {
		panic(err)
	}

	bucketHandler, err := util.GetFirebase(config.FireBaseBucket)
	if err != nil {
		panic(err)
	}

	ctl := controller.Controller{Pool: pool, SecretKey: config.SecretKey, BucketHandler: bucketHandler}

	mode := controller.DevMode{IsDev: config.IsDev}
	if mode.IsDev {
		r.Use(cors.New(CorsConfig(&mode)))
	}

	user := r.Group("/user")
	user.GET("/auth", ctl.ValiedateToken)
	user.GET("/info", ctl.AuthMiddleware(), ctl.GetUserInfo)
	user.POST("/register", ctl.UserRegister)
	user.POST("/login", ctl.UserLogin)
	user.POST("/avatar", ctl.AuthMiddleware(), ctl.UploadAvatar)
	user.DELETE("/logout", ctl.AuthMiddleware(), ctl.UserLogout)

	folder := r.Group("/folder")
	folder.GET("/:id", ctl.AuthMiddleware(), ctl.GetBreadCrumbs)
	folder.POST("/create", ctl.AuthMiddleware(), ctl.CreateFolder)
	folder.PATCH("/rename", ctl.AuthMiddleware(), ctl.UpdateFolderName)
	folder.PATCH("/move", ctl.AuthMiddleware(), ctl.MoveFolder)

	file := r.Group("/file")
	file.GET("/:id", ctl.AuthMiddleware(), ctl.GetFile)
	file.POST("/create", ctl.AuthMiddleware(), ctl.CreateFile)

	disk := r.Group("/disk")
	disk.GET("/:id", ctl.AuthMiddleware(), ctl.GetDisk)

	return r
}

func CorsConfig(mode *controller.DevMode) cors.Config {

	corsConf := cors.Config{
		MaxAge:                 12 * time.Hour,
		AllowBrowserExtensions: true,
	}
	corsConf.AllowOrigins = []string{"http://localhost:3000"}
	corsConf.AllowCredentials = true
	corsConf.AllowMethods = []string{"GET", "POST", "DELETE", "OPTIONS", "PUT"}
	corsConf.AllowHeaders = []string{"Authorization", "Content-Type", "Upgrade", "Origin",
		"Connection", "Accept-Encoding", "Accept-Language", "Host"}

	return corsConf
}
