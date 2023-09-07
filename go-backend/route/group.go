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

	ctl := controller.Controller{Conn: conn}

	user := r.Group("/user")
	user.POST("/register", ctl.AuthMiddleware(), ctl.UserRegister)
	user.POST("/login", ctl.UserLogin)

	return r
}
