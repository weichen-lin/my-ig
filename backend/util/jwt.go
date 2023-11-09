package util

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
)

type Maker interface {
	CreateToken(userId string, duration time.Time) (string, error)
	VerifyToken(string) (*Payload, error)
}

type JWTMaker struct {
	SecretKey string
}

type Payload struct {
	Id       string    `json:"id"`
	UserId   string    `json:"user_id"`
	CreateAt time.Time `json:"create_at"`
	ExpireAt time.Time `json:"expire_at"`
}

var (
	ErrInvalidToken = fmt.Errorf("invalid token")
	ErrExpiredToken = fmt.Errorf("token has expired")
)

func MakeJWTPayload(userId string, duration time.Time) (*Payload, error) {
	Id, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	return &Payload{
		Id:       Id.String(),
		UserId:   userId,
		CreateAt: time.Now(),
		ExpireAt: duration,
	}, nil
}

func (p *Payload) Valid() error {
	if time.Now().After(p.ExpireAt) {
		return ErrExpiredToken
	}

	return nil
}

func (j *JWTMaker) CreateToken(userId string, duration time.Time) (string, error) {
	payload, err := MakeJWTPayload(userId, duration)

	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	return token.SignedString([]byte(j.SecretKey))
}

func (j *JWTMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}

	keyFunc := func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, ErrInvalidToken
		}

		return []byte(j.SecretKey), nil
	}

	jwtToken, err := jwt.ParseWithClaims(token, payload, keyFunc)

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

func NewJWTMaker(secretKey string) (Maker, error) {
	if len(secretKey) < minSecretKeySize {
		return nil, fmt.Errorf("invalid key size: Must be at least %d characters", minSecretKeySize)
	}

	return &JWTMaker{SecretKey: secretKey}, nil
}
