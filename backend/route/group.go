package route

import (
	"context"
	"fmt"
	"net/http"
	"strings"

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
	fmt.Println(mode)
	if mode.IsDev {
		r.Use(Cors())
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
	file.GET("/:id", ctl.AuthMiddlewareWithCookie(), ctl.GetFile)
	file.GET("/description/:id", ctl.AuthMiddleware(), ctl.GetFileDescription)
	file.POST("/create", ctl.AuthMiddleware(), ctl.CreateFile)
	file.PATCH("/update", ctl.AuthMiddleware(), ctl.UpdateFileDescription)

	r.GET("/disk", ctl.AuthMiddleware(), ctl.GetDisk)
	disk := r.Group("/disk")
	disk.GET("/breadcrumb", ctl.AuthMiddleware(), ctl.GetBreadCrumbs)

	return r
}

// Cors 开放所有接口的OPTIONS方法
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method               //请求方法
		origin := c.Request.Header.Get("Origin") //请求头部
		var headerKeys []string                  // 声明请求头keys
		for k, _ := range c.Request.Header {
			headerKeys = append(headerKeys, k)
		}
		headerStr := strings.Join(headerKeys, ", ")
		if headerStr != "" {
			headerStr = fmt.Sprintf("access-control-allow-origin, access-control-allow-headers, %s", headerStr)
		} else {
			headerStr = "access-control-allow-origin, access-control-allow-headers"
		}
		if origin != "" {
			origin := c.Request.Header.Get("Origin")
			c.Header("Access-Control-Allow-Origin", origin)                                    // 这是允许访问所有域
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE,UPDATE") //服务器支持的所有跨域请求的方法,为了避免浏览次请求的多次'预检'请求
			//  header的类型
			c.Header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-CSRF-Token, Token,session,X_Requested_With,Accept, Origin, Host, Connection, Accept-Encoding, Accept-Language,DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Pragma")
			//              允许跨域设置                                                                                                      可以返回其他子段
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers,Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma,FooBar") // 跨域关键设置 让浏览器可以解析
			c.Header("Access-Control-Max-Age", "172800")                                                                                                                                                           // 缓存请求信息 单位为秒
			c.Header("Access-Control-Allow-Credentials", "true")                                                                                                                                                   //  跨域请求是否需要带cookie信息 默认设置为true
			c.Set("content-type", "application/json")                                                                                                                                                              // 设置返回格式是json
		}

		//放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "Options Request!")
		}
		// 处理请求
		c.Next() //  处理请求
	}
}
