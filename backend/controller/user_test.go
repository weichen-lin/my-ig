package controller

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
)

func Test_UserRegister_InvalidEmail(t *testing.T) {

	router := gin.Default()
	c := Controller{Pool: pool}

	router.POST("/user/register", c.UserRegister)

	params := []byte(`{"email":"sadasdasd","password":"123456", "name":"test"}`)

	req, _ := http.NewRequest("POST", "/user/register", bytes.NewBuffer(params))
	req.Header.Add("Content-Type", "application/json")

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)
	require.Equal(t, http.StatusBadRequest, w.Code)
}

func Test_UserRegister_Nil(t *testing.T) {

	router := gin.Default()
	c := Controller{Pool: pool}

	router.POST("/user/register", c.UserRegister)

	nilReq, _ := http.NewRequest("POST", "/user/register", nil)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, nilReq)
	require.Equal(t, http.StatusBadRequest, w.Code)
}

// func Test_UserRegister(t *testing.T) {

// 	router := gin.Default()
// 	c := Controller{Pool: pool, SecretKey: config.SecretKey}
// 	t.Log(config.SecretKey)

// 	router.POST("/user/register", c.UserRegister)

// 	params := []byte(`{"email":"sadassdasd@fasfsa.com","password":"123as456", "name":"tesasdast"}`)

// 	req, _ := http.NewRequest("POST", "/user/register", bytes.NewBuffer(params))
// 	req.Header.Add("Content-Type", "application/json")

// 	w := httptest.NewRecorder()

// 	router.ServeHTTP(w, req)

// 	require.Equal(t, http.StatusOK, w.Code)
// 	require.NotEmpty(t, w.Body.String())
// }
