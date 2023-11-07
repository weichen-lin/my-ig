package util

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func Test_Encrypt_and_Decrypt(t *testing.T) {
	secretKey := []byte("secretKey16bytes")

	id := uuid.New()
	ten_mins_expire := time.Now().Add(time.Minute * 10)
	t.Logf("ten_mins_expire: %+v", ten_mins_expire)

	token, err := EncryptToken(UserInfo{
		UserID:     id.String(),
		ExpireTime: ten_mins_expire,
	}, secretKey)
	require.NoError(t, err)
	require.NotEmpty(t, token)
	
	userInfo, err := DecryptToken(token, secretKey)
	require.NoError(t, err)
	require.Equal(t, id.String(), userInfo.UserID)
	require.WithinDuration(t, time.Now().Add(time.Minute * 10), userInfo.ExpireTime, time.Second)
}
