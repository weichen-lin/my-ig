package db

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
)

const getFolderFullPath = `SELECT set_folder_full_path($1)`

type Path struct {
	Id    uuid.UUID `json:"id"`
	Name  string    `json:"name"`
	Depth int32     `json:"depth"`
}

func (q *Queries) GetFolderFullPath(ctx context.Context, folderID uuid.UUID) ([]Path, error) {
	row := q.db.QueryRow(ctx, getFolderFullPath, folderID)
	var set_folder_full_path []Path
	err := row.Scan(&set_folder_full_path)
	return set_folder_full_path, err
}

type MoveFolderFuncParams struct {
	ID     uuid.UUID `json:"id"`
	MoveTo uuid.UUID `json:"moveTo"`
	UserID uuid.UUID `json:"userId"`
}

var (
	ErrCurrentFolderNotFound = errors.New("current folder not found")
	ErrTargetFolderNotFound  = errors.New("target folder not found")
	ErrFolderMoveToItself    = errors.New("can't move folder to itself")
)

func (q *Queries) CreateFolderWithFullPath(ctx context.Context, args CreateFolderParams) (Folder, error) {
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

	return folder, nil
}

type MoveFolderWithIdsParams struct {
	Ids    []uuid.UUID `json:"ids"`
	MoveTo uuid.UUID   `json:"moveTo"`
	UserID uuid.UUID   `json:"userId"`
}

func (q *Queries) MoveFoldersWithIds(ctx context.Context, args MoveFolderWithIdsParams) error {
	folders, err := q.SelectFoldersForMove(ctx, SelectFoldersForMoveParams{
		Ids:    args.Ids,
		UserID: args.UserID,
	})

	if err != nil {
		return err
	}

	if len(folders) != len(args.Ids) {
		return errors.New("some folders not found")
	}

	targetFolder, err := q.GetFolder(ctx, args.MoveTo)

	if err != nil || targetFolder.UserID != args.UserID {
		return ErrTargetFolderNotFound
	}

	err = q.MoveFolders(ctx, MoveFoldersParams{
		Ids:            args.Ids,
		UserID:         args.UserID,
		Depth:          targetFolder.Depth + 1,
		LocateAt:       args.MoveTo,
		LastModifiedAt: time.Now(),
	})

	if err != nil {
		return err
	}

	firstFolderAfterMove, err := q.GetFolder(ctx, args.Ids[0])
	if err != nil {
		return err
	}

	fullPath, err := q.GetFolderFullPath(ctx, firstFolderAfterMove.ID)
	if err != nil {
		return err
	}

	err = q.UpdateFoldersFullPath(ctx, UpdateFoldersFullPathParams{
		FullPath: fullPath,
		Ids:      args.Ids,
	})

	return err
}

type MoveFileWithIdsParams struct {
	Ids    []uuid.UUID `json:"ids"`
	MoveTo uuid.UUID   `json:"moveTo"`
	UserID uuid.UUID   `json:"userId"`
}

func (q *Queries) MoveFileWithIds(ctx context.Context, args MoveFileWithIdsParams) error {
	files, err := q.SelectFilesForMove(ctx, SelectFilesForMoveParams{
		Ids:    args.Ids,
		UserID: args.UserID,
	})

	if err != nil {
		return err
	}

	if len(files) != len(args.Ids) {
		return errors.New("some files not found")
	}

	targetFolder, err := q.GetFolder(ctx, args.MoveTo)

	if err != nil || targetFolder.UserID != args.UserID {
		return ErrTargetFolderNotFound
	}

	err = q.MoveFiles(ctx, MoveFilesParams{
		Ids:            args.Ids,
		UserID:         args.UserID,
		LocateAt:       args.MoveTo,
		LastModifiedAt: time.Now(),
	})

	return err
}
