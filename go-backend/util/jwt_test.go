package util

import (
	"testing"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func Test_JWTMaker(t *testing.T) {
	secretKey := Randomstring(32)

	jwtMaker, err := NewJWTMaker(secretKey)
	require.NoError(t, err)

	userId := uuid.New()
	now := time.Now()
	expectExpired := now.Add(time.Hour * 24 * 3)

	token, err := jwtMaker.CreateToken(userId.String(), expectExpired)
	require.NoError(t, err)

	payload, err := jwtMaker.VerifyToken(token)
	require.NoError(t, err)

	require.NotEmpty(t, payload.Id)
	require.Equal(t, payload.UserId, userId.String())
	require.NotZero(t, payload.CreateAt)
	require.NotZero(t, payload.ExpireAt)
	require.WithinDuration(t, payload.CreateAt, now, time.Second)
	require.WithinDuration(t, payload.ExpireAt, expectExpired, time.Second)
}

func Test_JWTExpired(t *testing.T) {
	secretKey := Randomstring(32)

	jwtMaker, err := NewJWTMaker(secretKey)
	require.NoError(t, err)

	userId := uuid.New()
	now := time.Now()
	// expectExpired := now.Add(time.Hour * 24 * 3)

	token, err := jwtMaker.CreateToken(userId.String(), now.Add(-time.Minute))
	require.NoError(t, err)

	payload, err := jwtMaker.VerifyToken(token)
	require.Error(t, err, ErrExpiredToken)
	require.Nil(t, payload)
}

func Test_JWTInvalid(t *testing.T) {
	secretKey := Randomstring(32)

	jwtMaker, err := NewJWTMaker(secretKey)
	require.NoError(t, err)

	userId := uuid.New()
	now := time.Now()

	token, err := jwtMaker.CreateToken(userId.String(), now.Add(time.Minute))
	require.NoError(t, err)

	payload, err := jwtMaker.VerifyToken(token + "invalid")
	require.Error(t, err, ErrInvalidToken)
	require.Nil(t, payload)
}

func Test_JWTNoAlgorithm(t *testing.T) {

	secretKey := Randomstring(32)

	userId := uuid.New()
	now := time.Now()

	payload, err := MakeJWTPayload(userId.String(), now.Add(time.Minute))
	require.NoError(t, err)
	require.NotEmpty(t, payload.Id)
	require.Equal(t, payload.UserId, userId.String())
	require.NotZero(t, payload.CreateAt)
	require.NotZero(t, payload.ExpireAt)
	require.WithinDuration(t, payload.CreateAt, now, time.Second)
	require.WithinDuration(t, payload.ExpireAt, now.Add(time.Minute), time.Second)

	token := jwt.NewWithClaims(jwt.SigningMethodNone, payload)
	signedToken, err := token.SignedString(jwt.UnsafeAllowNoneSignatureType)
	require.NoError(t, err)

	jwtMaker, err := NewJWTMaker(secretKey)
	require.NoError(t, err)

	payload, err = jwtMaker.VerifyToken(signedToken)
	require.Error(t, err, ErrInvalidToken)
	require.Nil(t, payload)
}
