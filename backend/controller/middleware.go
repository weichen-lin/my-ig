package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/weichen-lin/myig/db"
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

		userId, err := uuid.Parse(payload.UserId)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, errorResponse(ErrAuthFailed))
			ctx.Abort()
			return
		}

		conn, err := c.Pool.Acquire(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			ctx.Abort()
			return
		}
		q := db.New(conn)
		defer conn.Release()

		_, err = q.GetUserById(ctx, userId)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
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
