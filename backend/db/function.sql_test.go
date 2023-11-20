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

func Test_MoveFoldersWithIds(t *testing.T) {
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
	defer tx.Commit(context.Background())

	rootFolder, err := q.CreateFolderWithFullPath(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)

	folderIds := make([]uuid.UUID, 5)

	for i := 0; i < 5; i++ {
		folder, err := q.CreateFolderWithFullPath(context.Background(), CreateFolderParams{
			Name:     faker.Name(),
			LocateAt: uuid.Nil,
			Depth:    1,
			UserID:   user.ID,
		})
		require.NoError(t, err)
		require.NotEmpty(t, folder)

		folderIds[i] = folder.ID
	}

	err = q.MoveFoldersWithIds(context.Background(), MoveFolderWithIdsParams{
		Ids:    folderIds,
		MoveTo: rootFolder.ID,
		UserID: user.ID,
	})
	require.NoError(t, err)

	folders, err := q.SelectFoldersForMove(context.Background(), SelectFoldersForMoveParams{
		UserID: user.ID,
		Ids:    folderIds,
	})

	require.NoError(t, err)
	require.Len(t, folders, 5)

	for _, v := range folders {
		require.Equal(t, v.LocateAt, rootFolder.ID)
		require.Len(t, v.FullPath, 2)
	}
}

func Test_MoveAllRootFoldersWithIds(t *testing.T) {
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
	defer func() {
		if err != nil {
			tx.Rollback(context.Background())
			return
		}
		tx.Commit(context.Background())
	}()

	rootFolder, err := q.CreateFolderWithFullPath(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)

	folderIds := make([]uuid.UUID, 5)

	for i := 0; i < 5; i++ {
		folder, err := q.CreateFolderWithFullPath(context.Background(), CreateFolderParams{
			Name:     faker.Name(),
			LocateAt: rootFolder.ID,
			Depth:    2,
			UserID:   user.ID,
		})
		require.NoError(t, err)
		require.NotEmpty(t, folder)

		folderIds[i] = folder.ID
	}

	Ids := make([]uuid.UUID, 1)
	Ids[0] = rootFolder.ID

	err = q.MoveFoldersWithIds(context.Background(), MoveFolderWithIdsParams{
		Ids:    Ids,
		MoveTo: folderIds[0],
		UserID: user.ID,
	})
	require.Error(t, err)
}

func Test_MoveFilesWithIds(t *testing.T) {
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
	defer tx.Commit(context.Background())

	rootFolder, err := q.CreateFolderWithFullPath(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)

	fileIds := make([]uuid.UUID, 5)
	for i := 0; i < 5; i++ {
		file, err := q.CreateFile(context.Background(), CreateFileParams{
			Name:     faker.Name(),
			LocateAt: uuid.Nil,
			UserID:   user.ID,
		})
		require.NoError(t, err)
		require.NotEmpty(t, file)

		fileIds[i] = file.ID
	}

	err = q.MoveFileWithIds(context.Background(), MoveFileWithIdsParams{
		Ids:    fileIds,
		MoveTo: rootFolder.ID,
		UserID: user.ID,
	})
	require.NoError(t, err)

	files, err := q.SelectFilesForMove(context.Background(), SelectFilesForMoveParams{
		UserID: user.ID,
		Ids:    fileIds,
	})
	require.NoError(t, err)
	require.Len(t, files, 5)

	for _, v := range files {
		require.Equal(t, v.LocateAt, rootFolder.ID)
	}
}
