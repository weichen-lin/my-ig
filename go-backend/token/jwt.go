package token

import (
	"fmt"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
)

type Maker interface {
	CreateToken(userId uuid.UUID) (string, error)
	VerifyToken(string) (*Payload, error)
}

type JWTMaker struct {
	SecretKey string
}

func (j *JWTMaker) CreateToken(userId uuid.UUID) (string, error) {
	payload, err := MakeJWTPayload(userId)

	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	return token.SignedString([]byte(j.SecretKey))
}

func (j *JWTMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}

	jwtToken, err := jwt.ParseWithClaims(token, payload, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok { 
			return nil, ErrInvalidToken
		}

		return []byte(j.SecretKey), nil

	})

	if err != nil {
		verr, ok := err.(*jwt.ValidationError)
		if ok && verr.Errors == jwt.ValidationErrorExpired {
			return nil, ErrExpiredToken
		}

		return nil, ErrInvalidToken
	}

	payload, ok := jwtToken.Claims.(*Payload)
	if !ok {
		return nil, ErrInvalidToken
	}

	return payload, nil
}

const minSecretKeySize = 32

func MakeJWTToken(secretKey string) (Maker, error) {
	if len(secretKey) < minSecretKeySize {
		return nil, fmt.Errorf("Invalid key size: Must be at least %d characters", minSecretKeySize)
	}

	return &JWTMaker{SecretKey: secretKey}, nil
}
