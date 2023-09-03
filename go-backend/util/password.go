package util

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)
	if err != nil {
		return "", err
	}
	return string(hashedPwd), err
}

func ComparePassword(hashedPwd string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPwd), []byte(password))
}