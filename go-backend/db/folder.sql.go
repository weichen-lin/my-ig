// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.20.0
// source: folder.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const createFolder = `-- name: CreateFolder :one
INSERT INTO "folder" (name, locate_at, depth, user_id) VALUES ($1, $2, $3, $4) RETURNING id, name, locate_at, full_path, depth, is_deleted, created_at, last_modified_at, user_id
`

type CreateFolderParams struct {
	Name     string
	LocateAt uuid.UUID
	Depth    int32
	UserID   uuid.UUID
}

func (q *Queries) CreateFolder(ctx context.Context, arg CreateFolderParams) (Folder, error) {
	row := q.db.QueryRow(ctx, createFolder,
		arg.Name,
		arg.LocateAt,
		arg.Depth,
		arg.UserID,
	)
	var i Folder
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.LocateAt,
		&i.FullPath,
		&i.Depth,
		&i.IsDeleted,
		&i.CreatedAt,
		&i.LastModifiedAt,
		&i.UserID,
	)
	return i, err
}

const getFolder = `-- name: GetFolder :one
SELECT id, name, locate_at, full_path, depth, is_deleted, created_at, last_modified_at, user_id FROM "folder" WHERE id = $1
`

func (q *Queries) GetFolder(ctx context.Context, id uuid.UUID) (Folder, error) {
	row := q.db.QueryRow(ctx, getFolder, id)
	var i Folder
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.LocateAt,
		&i.FullPath,
		&i.Depth,
		&i.IsDeleted,
		&i.CreatedAt,
		&i.LastModifiedAt,
		&i.UserID,
	)
	return i, err
}

const updateFullPath = `-- name: UpdateFullPath :exec
UPDATE "folder" SET full_path = $1 WHERE id = $2 RETURNING id, name, locate_at, full_path, depth, is_deleted, created_at, last_modified_at, user_id
`

type UpdateFullPathParams struct {
	FullPath []interface{}
	ID       uuid.UUID
}

func (q *Queries) UpdateFullPath(ctx context.Context, arg UpdateFullPathParams) error {
	_, err := q.db.Exec(ctx, updateFullPath, arg.FullPath, arg.ID)
	return err
}
