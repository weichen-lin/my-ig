package controller

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
	"github.com/weichen-lin/myig/db"
)

func Test_UserRegister_InvalidEmail(t *testing.T) {
	
	router := gin.Default()
	c := UserController{Conn: conn}

	router.POST("/user/register", c.UserRegister )

	params := []byte(`{"email":"sadasdasd","password":"123456", "name":"test"}`)
	
	req, _ := http.NewRequest("POST", "/user/register", bytes.NewBuffer(params))
	req.Header.Add("Content-Type", "application/json")

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)
	require.Equal(t, http.StatusBadRequest, w.Code)
}

func Test_UserRegister_Nil(t *testing.T) {
	
	router := gin.Default()
	c := UserController{Conn: conn}

	router.POST("/user/register", c.UserRegister )

	nilReq, _ := http.NewRequest("POST", "/user/register", nil)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, nilReq)
	require.Equal(t, http.StatusBadRequest, w.Code)
}

func Test_UserRegister(t *testing.T) {
	
	router := gin.Default()
	c := UserController{Conn: conn}

	router.POST("/user/register", c.UserRegister )

	params := []byte(`{"email":"sadasdasd@fasfsa.com","password":"123as456", "name":"tesasdast"}`)
	
	req, _ := http.NewRequest("POST", "/user/register", bytes.NewBuffer(params))
	req.Header.Add("Content-Type", "application/json")

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)
	
	var user db.User

	json.Unmarshal([]byte(w.Body.String()), &user)

	require.Equal(t, http.StatusOK, w.Code)
	require.Equal(t, "sadasdasd@fasfsa.com", user.Email)
	require.Equal(t, "tesasdast", user.Name)
	require.NotEmpty(t, user.ID)
	require.NotEmpty(t, user.Password)
	require.NotEmpty(t, user.CreatedAt)
	require.NotEmpty(t, user.LastModifiedAt)
}
