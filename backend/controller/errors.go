package controller

import "fmt"

var (
	ErrUserAlreadyExist = fmt.Errorf("user already exists")
	ErrUserNotFound     = fmt.Errorf("user not found")
	ErrEmailInvalid     = fmt.Errorf("email is invalid")
	ErrInvalidToken     = fmt.Errorf("invalid token")
)

var (
	ErrAuthFailed = fmt.Errorf("authorization failed")
)

var (
	ErrLocateAtFailed = fmt.Errorf("invalid locateAt parameter")
)

var (
	ErrFileIdInvalid = fmt.Errorf("invalid fileId parameter")
)

var (
	ErrFolderAlreadyExist  = fmt.Errorf("folder already exists")
	ErrFolderNotExist      = fmt.Errorf("parent folder not exists")
	ErrFolderIdInvalid     = fmt.Errorf("invalid folderId parameter")
	ErrRootFolderCantEmpty = fmt.Errorf("root folder can't be empty")
)

var (
	ErrInvalidRequest = fmt.Errorf("invalid request")
)
