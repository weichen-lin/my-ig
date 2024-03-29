package route

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/weichen-lin/myig/controller"
	"github.com/weichen-lin/myig/util"
)

func PathRoute(r *gin.Engine) *gin.Engine {

	env := os.Getenv("KUSHARE_APP_ENV")

	if env == "" {
		env = "test"
	}

	config, err := util.Loadconfig(".", env)
	if err != nil {
		panic(err)
	}

	pool, err := pgxpool.New(context.Background(), config.DBSource)
	if err != nil {
		panic(err)
	}

	bucketHandler, err := util.NewMinioClient(&util.MinioConfig{
		BucketName:      config.MyIGBucketName,
		Endpoint:        config.MinioEndpoint,
		AccessKeyID:     config.MinioAccessKey,
		SecretAccessKey: config.MinioSecretKey,
		UseSSL:          false,
	})

	if err != nil {
		panic(err)
	}

	ctl := controller.Controller{
		Pool:          pool,
		SecretKey:     config.SecretKey,
		BucketHandler: bucketHandler,
		BucketName:    config.MyIGBucketName,
		EncryptSecret: config.EncryptSecret,
		AppPassword:   config.AppPassword}

	if !config.IsDev {
		r.Use(Cors(config.AllowedDomain))
	}

	user := r.Group("/user")
	user.GET("/auth", ctl.ValiedateToken)
	user.GET("/info", ctl.AuthMiddleware(), ctl.GetUserInfo)
	user.GET("/validate", ctl.AccountValidate)
	user.POST("/register", ctl.UserRegister)
	user.POST("/login", ctl.UserLogin)
	user.POST("/avatar", ctl.AuthMiddleware(), ctl.UploadAvatar)
	user.DELETE("/logout", ctl.AuthMiddleware(), ctl.UserLogout)

	folder := r.Group("/folder")
	folder.GET("/:id", ctl.AuthMiddleware(), ctl.GetBreadCrumbs)
	folder.GET("/detail", ctl.AuthMiddleware(), ctl.GetFolderDetail)
	folder.GET("/list", ctl.AuthMiddleware(), ctl.GetFolderList)
	folder.POST("/create", ctl.AuthMiddleware(), ctl.CreateFolder)
	folder.PATCH("/rename", ctl.AuthMiddleware(), ctl.UpdateFolderName)

	file := r.Group("/file")
	file.GET("/:id", ctl.AuthMiddlewareWithCookie(), ctl.GetFile)
	file.GET("/description/:id", ctl.AuthMiddleware(), ctl.GetFileDescription)
	file.POST("/create", ctl.AuthMiddleware(), ctl.CreateFile)
	file.POST("/download", ctl.AuthMiddleware(), ctl.DownloadFiles)
	file.PATCH("/rename", ctl.AuthMiddleware(), ctl.UpdateFileName)
	file.PATCH("/update", ctl.AuthMiddleware(), ctl.UpdateFileDescription)

	r.GET("/disk", ctl.AuthMiddleware(), ctl.GetDisk)

	disk := r.Group("/disk")
	disk.GET("/breadcrumb", ctl.AuthMiddleware(), ctl.GetBreadCrumbs)
	disk.PATCH("/delete", ctl.AuthMiddleware(), ctl.DeleteFilesAndFolders)
	disk.PATCH("/move", ctl.AuthMiddleware(), ctl.MoveFilesAndFolders)

	return r
}

func Cors(s string) gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		referer := c.Request.Header.Get("Referer")

		if s != "" && !strings.Contains(origin, s) && !strings.Contains(referer, s) {
			c.String(http.StatusUnauthorized, "Invalid Source : "+origin)
			c.Abort()
			return
		}

		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, PUT, DELETE, UPDATE")

		c.Header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-CSRF-Token, Token,session,X_Requested_With,Accept, Origin, Host, Connection, Accept-Encoding, Accept-Language,DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Pragma, Content-Disposition")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma, Set-Cookie, Content-Disposition")
		c.Header("Access-Control-Max-Age", "172800")
		c.Header("Access-Control-Allow-Credentials", "true")

		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "Options Request!")
		}

		c.Next()
	}
}
