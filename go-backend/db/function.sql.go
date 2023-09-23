package db

import (
	"context"

	"github.com/google/uuid"
)

const getFolderFullPath = `SELECT set_folder_full_path($1)`

type Path struct {
	Id uuid.UUID `json:"id"`
	Name string `json:"name"`
	Depth int32 `json:"depth"`
}

func (q *Queries) GetFolderFullPath(ctx context.Context, folderID uuid.UUID) ([]Path, error) {
	row := q.db.QueryRow(ctx, getFolderFullPath, folderID)
	var set_folder_full_path []Path
	err := row.Scan(&set_folder_full_path)
	return set_folder_full_path, err
}
