package route

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/weichen-lin/myig/controller"
	"github.com/weichen-lin/myig/util"
)

func PathRoute(r *gin.Engine) *gin.Engine {

	config, err := util.Loadconfig(".", "test")
	if err != nil {
		panic(err)
	}

	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		panic(err)
	}

	app, err := util.GetFirebase()

	ctl := controller.Controller{Conn: conn, SecretKey: config.SecretKey, App: app}

	user := r.Group("/user")
	user.POST("/register", ctl.UserRegister)
	user.POST("/login", ctl.UserLogin)
	user.POST("/avatar", ctl.UploadAvatar)

	return r
}
