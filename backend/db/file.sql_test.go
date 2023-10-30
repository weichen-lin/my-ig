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
		Name:     faker.Name(),
		Url:      faker.URL(),
		UserID:   user.ID,
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

	tx.Commit(context.Background())
}

func Test_Getfile(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	arg := GetFileParams{
		ID:     uuid.Nil,
		UserID: user.ID,
	}

	file, err := q.GetFile(context.Background(), arg)
	require.Error(t, err)
	require.Empty(t, file)

	tx.Commit(context.Background())
}

func Test_Getfiles(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	arg_1 := CreateFileParams{
		Name:     faker.Name(),
		Url:      faker.URL(),
		UserID:   user.ID,
		LocateAt: uuid.Nil,
	}

	file_1, err := q.CreateFile(context.Background(), arg_1)
	require.NoError(t, err)
	require.NotEmpty(t, file_1)

	arg_2 := CreateFileParams{
		Name:     faker.Name(),
		Url:      faker.URL(),
		UserID:   user.ID,
		LocateAt: uuid.Nil,
	}

	file_2, err := q.CreateFile(context.Background(), arg_2)
	require.NoError(t, err)
	require.NotEmpty(t, file_2)

	arg := SelectFilesParams{
		UserID:   user.ID,
		LocateAt: uuid.Nil,
	}

	files, err := q.SelectFiles(context.Background(), arg)
	require.NoError(t, err)
	require.Len(t, files, 2)

	tx.Commit(context.Background())
}

func Test_GetFileDescription(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	arg_1 := CreateFileParams{
		Name:     faker.Name(),
		Url:      faker.URL(),
		UserID:   user.ID,
		LocateAt: uuid.Nil,
	}

	file, err := q.CreateFile(context.Background(), arg_1)
	require.NoError(t, err)
	require.NotEmpty(t, file)
	require.Empty(t, file.Description)

	tx.Commit(context.Background())
}

func Test_UpdateDescription(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	arg := CreateFileParams{
		Name:     faker.Name(),
		Url:      faker.URL(),
		UserID:   user.ID,
		LocateAt: uuid.Nil,
	}

	file, err := q.CreateFile(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, file)
	require.Empty(t, file.Description)

	fakeName := faker.Name()
	err = q.UpdateFileDescription(context.Background(), UpdateFileDescriptionParams{
		ID:          file.ID,
		UserID:      user.ID,
		Description: &fakeName,
	})
	require.NoError(t, err)
	tx.Commit(context.Background())

	conn, err := pool.Acquire(context.Background())
	require.NoError(t, err)

	q = New(conn)
	defer conn.Release()
	description, err := q.SelectFileDescription(context.Background(), SelectFileDescriptionParams{
		ID:     file.ID,
		UserID: user.ID,
	})

	require.NoError(t, err)
	require.NotEmpty(t, description)
	require.Equal(t, fakeName, *description)
}
