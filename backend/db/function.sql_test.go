package db

import (
	"context"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func Test_CreateFolderWithFullPath(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	folder, err := q.CreateFolderWithFullPath(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, folder)

	checkFolder, err := q.GetFolder(context.Background(), folder.ID)
	require.NoError(t, err)
	require.NotEmpty(t, checkFolder)
	require.Equal(t, folder.ID, checkFolder.ID)
	require.Equal(t, folder.Name, checkFolder.Name)
	require.Equal(t, folder.LocateAt, checkFolder.LocateAt)
	require.Equal(t, folder.Depth, checkFolder.Depth)
	require.Equal(t, folder.UserID, checkFolder.UserID)

	PathSlice := make([]interface{}, len(checkFolder.FullPath))
	for i, v := range checkFolder.FullPath {
		PathSlice[i] = v
	}

	fullPath, err := q.GetFolderFullPath(context.Background(), folder.ID)
	require.NoError(t, err)
	require.Len(t, fullPath, 1)
	require.Equal(t, fullPath[0].Id, checkFolder.ID)
	require.Equal(t, fullPath[0].Name, checkFolder.Name)
	require.Equal(t, fullPath[0].Depth, checkFolder.Depth)

	tx.Commit(context.Background())
}

func Test_FolderMoveMent(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	depth_1_folder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, depth_1_folder)

	depth_2_folder, err := CreateFolderWithFullPathAtTest(context.Background(), CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: depth_1_folder.ID,
		Depth:    depth_1_folder.Depth + 1,
		UserID:   user.ID,
	})
	require.NoError(t, err)
	require.NotEmpty(t, depth_2_folder)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	err = q.MoveFolderWithId(context.Background(), MoveFolderFuncParams{
		ID:     uuid.New(),
		MoveTo: depth_1_folder.ID,
		UserID: user.ID,
	})

	require.Error(t, err)
	require.EqualError(t, err, ErrCurrentFolderNotFound.Error())

	err = q.MoveFolderWithId(context.Background(), MoveFolderFuncParams{
		ID:     depth_2_folder.ID,
		MoveTo: uuid.New(),
		UserID: user.ID,
	})

	require.Error(t, err)
	require.EqualError(t, err, ErrTargetFolderNotFound.Error())

	err = q.MoveFolderWithId(context.Background(), MoveFolderFuncParams{
		ID:     depth_2_folder.ID,
		MoveTo: depth_2_folder.LocateAt,
		UserID: user.ID,
	})

	require.Error(t, err)
	require.EqualError(t, err, ErrFolderMoveToItself.Error())
}
