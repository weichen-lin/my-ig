package db

import (
	"context"
	"testing"
	"time"

	"github.com/bxcodec/faker/v3"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/stretchr/testify/require"
)

func CreateFolderWithFullPathAtTest(ctx context.Context, args CreateFolderParams) (Folder, error) {
	var err error
	tx, err := pool.Begin(ctx)
	if err != nil {
		return Folder{}, err
	}

	q := New(tx)
	folder, err := q.CreateFolder(ctx, args)
	if err != nil {
		return Folder{}, err
	}

	fullPath, err := q.GetFolderFullPath(ctx, folder.ID)
	if err != nil {
		return Folder{}, err
	}

	err = q.UpdateFullPath(ctx, UpdateFullPathParams{
		FullPath: fullPath,
		ID:       folder.ID,
	})

	if err != nil {
		return Folder{}, err
	}

	err = tx.Commit(ctx)
	if err != nil {
		tx.Rollback(ctx)
		return Folder{}, err
	}

	return folder, nil
}

func Test_CreateFolderAtRoot(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	folder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, folder)
	require.NotEmpty(t, folder.ID)
	require.Equal(t, arg.Name, folder.Name)
	require.Equal(t, arg.LocateAt, folder.LocateAt)
	require.Equal(t, arg.Depth, folder.Depth)
	require.Equal(t, arg.UserID, folder.UserID)
	require.Equal(t, false, folder.IsDeleted)
	require.NotEmpty(t, folder.CreatedAt)
	require.NotEmpty(t, folder.LastModifiedAt)

	tx, err := pool.Begin(context.Background())
	defer tx.Commit(context.Background())
	require.NoError(t, err)

	q := New(tx)
	fullPath, err := q.GetFolderFullPath(context.Background(), folder.ID)
	require.NoError(t, err)
	require.NotEmpty(t, fullPath)
	require.Equal(t, 1, len(fullPath))
	require.Equal(t, folder.ID, fullPath[0].Id)
	require.Equal(t, folder.Name, fullPath[0].Name)
	require.Equal(t, folder.Depth, fullPath[0].Depth)
}

func Test_CreateFolderInFolder(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	rootFolder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)
	require.NotEmpty(t, rootFolder.ID)
	require.Equal(t, arg.Name, rootFolder.Name)
	require.Equal(t, arg.LocateAt, rootFolder.LocateAt)
	require.Equal(t, arg.Depth, rootFolder.Depth)
	require.Equal(t, arg.UserID, rootFolder.UserID)
	require.Equal(t, false, rootFolder.IsDeleted)
	require.NotEmpty(t, rootFolder.CreatedAt)
	require.NotEmpty(t, rootFolder.LastModifiedAt)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	getRootFolder, err := q.GetFolder(context.Background(), rootFolder.ID)
	require.NoError(t, err)
	require.NotEmpty(t, getRootFolder)

	arg = CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: rootFolder.ID,
		Depth:    rootFolder.Depth + 1,
		UserID:   user.ID,
	}

	folder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, folder)

	fullPath, err := q.GetFolderFullPath(context.Background(), folder.ID)
	require.NoError(t, err)
	require.NotEmpty(t, fullPath)
	require.Equal(t, 2, len(fullPath))
	require.Equal(t, rootFolder.ID, fullPath[1].Id)
	require.Equal(t, folder.ID, fullPath[0].Id)
	require.Equal(t, rootFolder.Name, fullPath[1].Name)
	require.Equal(t, folder.Name, fullPath[0].Name)
	require.Equal(t, rootFolder.Depth, fullPath[1].Depth)
	require.Equal(t, folder.Depth, fullPath[0].Depth)

	tx.Commit(context.Background())
}

func Test_CheckFolderExistAtRoot(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	rootFolder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)
	require.NotEmpty(t, rootFolder.ID)
	require.Equal(t, arg.Name, rootFolder.Name)
	require.Equal(t, arg.LocateAt, rootFolder.LocateAt)
	require.Equal(t, arg.Depth, rootFolder.Depth)
	require.Equal(t, arg.UserID, rootFolder.UserID)
	require.Equal(t, false, rootFolder.IsDeleted)
	require.NotEmpty(t, rootFolder.CreatedAt)
	require.NotEmpty(t, rootFolder.LastModifiedAt)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	checkFolderExist, err := q.CheckFolderExist(context.Background(), CheckFolderExistParams{
		LocateAt: uuid.Nil,
		Name:     rootFolder.Name,
		UserID:   rootFolder.UserID,
	})
	require.NoError(t, err)
	require.NotEmpty(t, checkFolderExist)
	require.Equal(t, rootFolder.ID, checkFolderExist.ID)
	require.Equal(t, rootFolder.Name, checkFolderExist.Name)
	require.Equal(t, rootFolder.LocateAt, checkFolderExist.LocateAt)
	require.Equal(t, rootFolder.Depth, checkFolderExist.Depth)
	require.Equal(t, rootFolder.UserID, checkFolderExist.UserID)
	require.Equal(t, rootFolder.IsDeleted, checkFolderExist.IsDeleted)
	require.Equal(t, rootFolder.CreatedAt, checkFolderExist.CreatedAt)
	require.Equal(t, rootFolder.LastModifiedAt, checkFolderExist.LastModifiedAt)

	tx.Commit(context.Background())
}

func Test_CheckFolderExistInFolder(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	rootFolder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)
	require.NotEmpty(t, rootFolder.ID)
	require.Equal(t, arg.Name, rootFolder.Name)
	require.Equal(t, arg.LocateAt, rootFolder.LocateAt)
	require.Equal(t, arg.Depth, rootFolder.Depth)
	require.Equal(t, arg.UserID, rootFolder.UserID)
	require.Equal(t, false, rootFolder.IsDeleted)
	require.NotEmpty(t, rootFolder.CreatedAt)
	require.NotEmpty(t, rootFolder.LastModifiedAt)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	getRootFolder, err := q.GetFolder(context.Background(), rootFolder.ID)
	require.NoError(t, err)
	require.NotEmpty(t, getRootFolder)

	arg = CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: rootFolder.ID,
		Depth:    rootFolder.Depth + 1,
		UserID:   user.ID,
	}

	folder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, folder)

	checkFolderExist, err := q.CheckFolderExist(context.Background(), CheckFolderExistParams{
		LocateAt: rootFolder.ID,
		Name:     folder.Name,
		UserID:   folder.UserID,
	})
	require.NoError(t, err)
	require.NotEmpty(t, checkFolderExist)
	require.Equal(t, folder.ID, checkFolderExist.ID)
	require.Equal(t, folder.Name, checkFolderExist.Name)
	require.Equal(t, folder.LocateAt, checkFolderExist.LocateAt)
	require.Equal(t, folder.Depth, checkFolderExist.Depth)
	require.Equal(t, folder.UserID, checkFolderExist.UserID)
	require.Equal(t, folder.IsDeleted, checkFolderExist.IsDeleted)
	require.Equal(t, folder.CreatedAt, checkFolderExist.CreatedAt)
	require.Equal(t, folder.LastModifiedAt, checkFolderExist.LastModifiedAt)

	checkFolderNotExist, err := q.CheckFolderExist(context.Background(), CheckFolderExistParams{
		LocateAt: rootFolder.ID,
		Name:     faker.Name(),
		UserID:   folder.UserID,
	})
	require.Error(t, err)
	require.Empty(t, checkFolderNotExist)
	require.Equal(t, pgx.ErrNoRows, err)

	tx.Commit(context.Background())
}

func Test_GetFolder(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	rootFolder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)
	require.NotEmpty(t, rootFolder.ID)
	require.Equal(t, arg.Name, rootFolder.Name)
	require.Equal(t, arg.LocateAt, rootFolder.LocateAt)
	require.Equal(t, arg.Depth, rootFolder.Depth)
	require.Equal(t, arg.UserID, rootFolder.UserID)
	require.Equal(t, false, rootFolder.IsDeleted)
	require.NotEmpty(t, rootFolder.CreatedAt)
	require.NotEmpty(t, rootFolder.LastModifiedAt)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	getRootFolder, err := q.GetFolder(context.Background(), rootFolder.ID)
	require.NoError(t, err)
	require.NotEmpty(t, getRootFolder)
	require.Equal(t, rootFolder.ID, getRootFolder.ID)
	require.Equal(t, rootFolder.Name, getRootFolder.Name)
	require.Equal(t, rootFolder.LocateAt, getRootFolder.LocateAt)
	require.Equal(t, rootFolder.Depth, getRootFolder.Depth)
	require.Equal(t, rootFolder.UserID, getRootFolder.UserID)
	require.Equal(t, rootFolder.IsDeleted, getRootFolder.IsDeleted)
	require.Equal(t, rootFolder.CreatedAt, getRootFolder.CreatedAt)
	require.Equal(t, rootFolder.LastModifiedAt, getRootFolder.LastModifiedAt)

	ramdomId, err := uuid.NewRandom()
	require.NoError(t, err)

	folder, err := q.GetFolder(context.Background(), ramdomId)
	require.Error(t, err)
	require.Equal(t, pgx.ErrNoRows, err)
	require.Empty(t, folder)

	tx.Commit(context.Background())
}

func Test_UpdateFolderName(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	rootFolder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, rootFolder)
	require.NotEmpty(t, rootFolder.ID)
	require.Equal(t, arg.Name, rootFolder.Name)
	require.Equal(t, arg.LocateAt, rootFolder.LocateAt)
	require.Equal(t, arg.Depth, rootFolder.Depth)
	require.Equal(t, arg.UserID, rootFolder.UserID)
	require.Equal(t, false, rootFolder.IsDeleted)
	require.NotEmpty(t, rootFolder.CreatedAt)
	require.NotEmpty(t, rootFolder.LastModifiedAt)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	defer tx.Commit(context.Background())

	q := New(tx)

	renameArg := UpdateFolderNameParams{
		Name:           faker.Name(),
		ID:             rootFolder.ID,
		LastModifiedAt: time.Now(),
	}
	renameFolder, err := q.UpdateFolderName(context.Background(), renameArg)
	require.NoError(t, err)
	require.NotEmpty(t, renameFolder)
	require.Equal(t, renameArg.Name, renameFolder.Name)
	require.WithinDuration(t, renameArg.LastModifiedAt, renameFolder.LastModifiedAt, time.Second)
	require.Equal(t, renameArg.ID, renameFolder.ID)
}

func Test_DeleteFolder(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	folder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
	require.NoError(t, err)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	err = q.DeleteFolder(context.Background(), DeleteFolderParams{
		ID:     folder.ID,
		UserID: user.ID,
	})
	require.NoError(t, err)
	tx.Commit(context.Background())
}

func Test_GetFolders(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg_1 := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	folder_1, err := CreateFolderWithFullPathAtTest(context.Background(), arg_1)
	require.NoError(t, err)
	require.NotEmpty(t, folder_1)

	arg_2 := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	folder_2, err := CreateFolderWithFullPathAtTest(context.Background(), arg_2)
	require.NoError(t, err)
	require.NotEmpty(t, folder_2)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	folders, err := q.SelectFolders(context.Background(), SelectFoldersParams{
		UserID:   user.ID,
		LocateAt: uuid.Nil,
	})
	require.NoError(t, err)
	require.Len(t, folders, 2)
}

func Test_UpdateFoldersDeleted(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	arg_1 := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	folder_1, err := CreateFolderWithFullPathAtTest(context.Background(), arg_1)
	require.NoError(t, err)
	require.NotEmpty(t, folder_1)

	arg_2 := CreateFolderParams{
		Name:     faker.Name(),
		LocateAt: uuid.Nil,
		Depth:    1,
		UserID:   user.ID,
	}

	folder_2, err := CreateFolderWithFullPathAtTest(context.Background(), arg_2)
	require.NoError(t, err)
	require.NotEmpty(t, folder_2)

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	folders, err := q.SelectFolders(context.Background(), SelectFoldersParams{
		UserID:   user.ID,
		LocateAt: uuid.Nil,
	})
	require.NoError(t, err)
	require.Len(t, folders, 2)

	var Ids []uuid.UUID

	for i := 0; i < len(folders); i++ {
		Ids = append(Ids, folders[i].ID)
	}

	err = q.UpdateFoldersDeleted(context.Background(), UpdateFoldersDeletedParams{
		Ids:    Ids,
		UserID: user.ID,
	})
	require.NoError(t, err)

	folder_1_afterUpdate, err := q.GetFolder(context.Background(), folder_1.ID)
	require.NoError(t, err)
	require.Equal(t, true, folder_1_afterUpdate.IsDeleted)
	require.Equal(t, folder_1.ID, folder_1_afterUpdate.ID)
	require.Equal(t, folder_1.Name, folder_1_afterUpdate.Name)
	require.Equal(t, folder_1.LocateAt, folder_1_afterUpdate.LocateAt)

	folder_2_afterUpdate, err := q.GetFolder(context.Background(), folder_2.ID)
	require.NoError(t, err)
	require.Equal(t, true, folder_2_afterUpdate.IsDeleted)
	require.Equal(t, folder_2.ID, folder_2_afterUpdate.ID)
	require.Equal(t, folder_2.Name, folder_2_afterUpdate.Name)
	require.Equal(t, folder_2.LocateAt, folder_2_afterUpdate.LocateAt)

	tx.Commit(context.Background())
}

func Test_SelectAllFoldersWithOffset(t *testing.T) {
	user, err := CreateUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, user)

	for i := 0; i < 100; i++ {
		arg := CreateFolderParams{
			Name:     faker.Name(),
			LocateAt: uuid.Nil,
			Depth:    1,
			UserID:   user.ID,
		}

		folder, err := CreateFolderWithFullPathAtTest(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, folder)
	}

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	selectedFolders, err := q.SelectAllFoldersWithOffset(context.Background(), SelectAllFoldersWithOffsetParams{
		UserID: user.ID,
		Offset: 10,
	})
	require.NoError(t, err)
	require.Len(t, selectedFolders, 10)

	tx.Commit(context.Background())
}