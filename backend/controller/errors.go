package controller

import "fmt"

var (
	ErrUserAlreadyExist = fmt.Errorf("User already exists!")
	ErrUserNotFound     = fmt.Errorf("User not found!")
	ErrEmailInvalid     = fmt.Errorf("Email is invalid!")
)

var (
	ErrAuthFailed = fmt.Errorf("Authorization failed")
)

var (
	ErrLocateAtFailed = fmt.Errorf("Invalid lcateAt parameter")
)

var (
	ErrFileIdInvalid = fmt.Errorf("Invalid fileId parameter")
)

var (
	ErrFolderAlreadyExist = fmt.Errorf("Folder already exists!")
	ErrFolderNotExist     = fmt.Errorf("Parent folder not exists!")
)

var (
	ErrInvalidRequest = fmt.Errorf("Invalid request")
)
