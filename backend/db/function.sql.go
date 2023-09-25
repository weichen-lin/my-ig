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

func (q *Queries) MoveFolderWithId(ctx context.Context, args MoveFolderFuncParams) error {
	folder, err := q.GetFolder(ctx, args.ID)
	if err != nil || folder.UserID != args.UserID {
		return errors.New("current folder not found")
	}

	folderMoveTo, err := q.GetFolder(ctx, args.MoveTo)
	if err != nil || folderMoveTo.UserID != args.UserID {
		return errors.New("target folder not found")
	}

	if folder.LocateAt == args.MoveTo {
		return errors.New("Can't move folder to itself")
	}

	folderAfterMove, err := q.MoveFolder(ctx, MoveFolderParams{
		ID:             args.ID,
		LocateAt:       args.MoveTo,
		Depth:          folderMoveTo.Depth + 1,
		LastModifiedAt: time.Now(),
		UserID:         args.UserID,
	})

	fullPath, err := q.GetFolderFullPath(context.Background(), folderAfterMove.ID)

	PathSlice := make([]interface{}, len(fullPath))
	for i, v := range fullPath {
		PathSlice[i] = v
	}

	err = q.UpdateFullPath(context.Background(), UpdateFullPathParams{
		FullPath: PathSlice,
		ID:       folderAfterMove.ID,
	})

	if err != nil {
		return err
	}

	return nil
}

func CreateFolderWithFullPath(ctx context.Context, q *Queries, args CreateFolderParams) (Folder, error) {
	folder, err := q.CreateFolder(ctx, args)
	if err != nil {
		return Folder{}, err
	}

	fullPath, err := q.GetFolderFullPath(ctx, folder.ID)
	if err != nil {
		return Folder{}, err
	}

	PathSlice := make([]interface{}, len(fullPath))
	for i, v := range fullPath {
		PathSlice[i] = v
	}

	err = q.UpdateFullPath(ctx, UpdateFullPathParams{
		FullPath: PathSlice,
		ID:       folder.ID,
	})

	if err != nil {
		return Folder{}, err
	}

	return folder, nil
}
