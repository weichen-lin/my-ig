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
			return
		}

		jwtMaker, err := util.NewJWTMaker(c.SecretKey)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Invalid Authorization")
			ctx.Abort()
			return
		}

		payload, err := jwtMaker.VerifyToken(header)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Invalid Authorization")
			ctx.Abort()
			return
		}

		ctx.Set("userId", payload.UserId)

		ctx.Next()
	}
}

func (c *Controller) AuthMiddlewareWithCookie() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		cookie, err := ctx.Cookie("token")
		if err != nil || cookie == "" {
			ctx.String(http.StatusUnauthorized, "Invalid Authorization")
			ctx.Abort()
			return
		}

		jwtMaker, err := util.NewJWTMaker(c.SecretKey)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Invalid Authorization")
			ctx.Abort()
			return
		}

		payload, err := jwtMaker.VerifyToken(cookie)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Invalid Authorization")
			ctx.Abort()
			return
		}

		ctx.Set("userId", payload.UserId)

		ctx.Next()
	}
}

type DevMode struct {
	IsDev bool `json:"dev"`
}

func CORSMiddleware(mode DevMode) gin.HandlerFunc {
	return func(c *gin.Context) {
		if mode.IsDev {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		}

		c.Next()
	}
}
