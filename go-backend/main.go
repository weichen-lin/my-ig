package main

import (
	"github.com/gin-gonic/gin"
	"github.com/weichen-lin/myig/route"
)

func main() {
	r := gin.Default()
	r = route.PathRoute(r)

	r.Run()
}
