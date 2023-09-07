package token

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Payload struct {
	Id       uuid.UUID `json:"id"`
	UserId   uuid.UUID `json:"user_id"`
	CreateAt time.Time `json:"create_at"`
	ExpireAt time.Time `json:"expire_at"`
}

var (
	ErrInvalidToken = fmt.Errorf("Invalid token")
	ErrExpiredToken = fmt.Errorf("Token has expired")
)

func MakeJWTPayload(userId uuid.UUID) (*Payload, error) {
	Id, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	return &Payload{
		Id:       Id,
		UserId:   userId,
		CreateAt: time.Now(),
		ExpireAt: time.Now().Add(time.Hour * 24 * 3),
	}, nil
}

func (p *Payload) Valid() error {
	if time.Now().After(p.ExpireAt) {
		return ErrExpiredToken
	}

	return nil
}