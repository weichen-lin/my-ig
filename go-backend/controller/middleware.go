package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (c *Controller) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if header == "" {
			c.String(http.StatusUnauthorized, "Need Authorization")
			c.Abort()
		}

		// _, err := c.Maker.VerifyToken(header)
		// if err != nil {
		// 	c.String(http.StatusUnauthorized, "Invalid Authorization")
		// 	c.Abort()
		// }

		c.Next()
	}
}
