package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/weichen-lin/myig/util"
)


func (c *Controller) AuthMiddleware() gin.HandlerFunc {

	return func(ctx *gin.Context) {
		header := ctx.GetHeader("Authorization")
		if header == "" {
			ctx.String(http.StatusUnauthorized, "Invalid Authorization")
			ctx.Abort()
		}

		jwtMaker, err := util.NewJWTMaker(c.SecretKey)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Invalid Authorization")
			ctx.Abort()
		}

		payload, err := jwtMaker.VerifyToken(header)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Invalid Authorization")
			ctx.Abort()
		}
		
		ctx.Set("userId", payload.UserId)

		ctx.Next()
	}
}
