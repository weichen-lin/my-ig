package db

import (
	"context"
	"testing"
	"time"

	"github.com/bxcodec/faker/v3"
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func Test_CreateFile(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	arg := CreateFileParams{
		Name: faker.Name(),
		Url: faker.URL(),
		UserID: user.ID,
		LocateAt: uuid.Nil,
	}

	file, err := q.CreateFile(context.Background(), arg)
	require.NoError(t, err)
	require.Equal(t, arg.Name, file.Name)
	require.Equal(t, arg.Url, file.Url)
	require.Equal(t, arg.UserID, file.UserID)
	require.Equal(t, arg.LocateAt, file.LocateAt)
	require.NotEmpty(t, file.ID)
	require.WithinDuration(t, file.CreatedAt, time.Now(), time.Second)
	require.WithinDuration(t, file.LastModifiedAt, time.Now(), time.Second)
}