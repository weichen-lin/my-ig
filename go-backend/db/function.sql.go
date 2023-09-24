package db

import (
	"context"

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