// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.20.0
// source: folder.sql

package db

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const checkFolderExist = `-- name: CheckFolderExist :one
SELECT id, name, locate_at, full_path, depth, is_deleted, created_at, last_modified_at, user_id FROM "folder" WHERE locate_at = $1 AND name = $2 AND user_id = $3
`

type CheckFolderExistParams struct {
	LocateAt uuid.UUID `json:"locateAt"`
	Name     string    `json:"name"`
	UserID   uuid.UUID `json:"userId"`
}

func (q *Queries) CheckFolderExist(ctx context.Context, arg CheckFolderExistParams) (Folder, error) {
	row := q.db.QueryRow(ctx, checkFolderExist, arg.LocateAt, arg.Name, arg.UserID)
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

const createFolder = `-- name: CreateFolder :one
INSERT INTO "folder" (name, locate_at, depth, user_id) VALUES ($1, $2, $3, $4) RETURNING id, name, locate_at, full_path, depth, is_deleted, created_at, last_modified_at, user_id
`

type CreateFolderParams struct {
	Name     string    `json:"name"`
	LocateAt uuid.UUID `json:"locateAt"`
	Depth    int32     `json:"depth"`
	UserID   uuid.UUID `json:"userId"`
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

const deleteFolder = `-- name: DeleteFolder :exec
DELETE FROM "folder" WHERE id = $1 and user_id = $2
`

type DeleteFolderParams struct {
	ID     uuid.UUID `json:"id"`
	UserID uuid.UUID `json:"userId"`
}

func (q *Queries) DeleteFolder(ctx context.Context, arg DeleteFolderParams) error {
	_, err := q.db.Exec(ctx, deleteFolder, arg.ID, arg.UserID)
	return err
}

const deleteFolders = `-- name: DeleteFolders :exec
DELETE FROM "folder" WHERE user_id = $1 AND id IN ($2::uuid[])
`

type DeleteFoldersParams struct {
	UserID uuid.UUID   `json:"userId"`
	Ids    []uuid.UUID `json:"ids"`
}

func (q *Queries) DeleteFolders(ctx context.Context, arg DeleteFoldersParams) error {
	_, err := q.db.Exec(ctx, deleteFolders, arg.UserID, arg.Ids)
	return err
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

const moveFolder = `-- name: MoveFolder :one
UPDATE
	"folder"
SET
	locate_at = $1,
	depth = $2,
	last_modified_at = $3
WHERE
	id = $4
	AND user_id = $5
RETURNING
	id, name, locate_at, full_path, depth, is_deleted, created_at, last_modified_at, user_id
`

type MoveFolderParams struct {
	LocateAt       uuid.UUID `json:"locateAt"`
	Depth          int32     `json:"depth"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
	ID             uuid.UUID `json:"id"`
	UserID         uuid.UUID `json:"userId"`
}

func (q *Queries) MoveFolder(ctx context.Context, arg MoveFolderParams) (Folder, error) {
	row := q.db.QueryRow(ctx, moveFolder,
		arg.LocateAt,
		arg.Depth,
		arg.LastModifiedAt,
		arg.ID,
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

const selectFolders = `-- name: SelectFolders :many
SELECT id, name, last_modified_at FROM "folder" WHERE locate_at = $1 AND user_id = $2 ORDER BY last_modified_at ASC
`

type SelectFoldersParams struct {
	LocateAt uuid.UUID `json:"locateAt"`
	UserID   uuid.UUID `json:"userId"`
}

type SelectFoldersRow struct {
	ID             uuid.UUID `json:"id"`
	Name           string    `json:"name"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
}

func (q *Queries) SelectFolders(ctx context.Context, arg SelectFoldersParams) ([]SelectFoldersRow, error) {
	rows, err := q.db.Query(ctx, selectFolders, arg.LocateAt, arg.UserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []SelectFoldersRow
	for rows.Next() {
		var i SelectFoldersRow
		if err := rows.Scan(&i.ID, &i.Name, &i.LastModifiedAt); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateFolderName = `-- name: UpdateFolderName :one
UPDATE "folder" SET name = $1, last_modified_at = $2 WHERE id = $3 RETURNING id, name, locate_at, full_path, depth, is_deleted, created_at, last_modified_at, user_id
`

type UpdateFolderNameParams struct {
	Name           string    `json:"name"`
	LastModifiedAt time.Time `json:"lastModifiedAt"`
	ID             uuid.UUID `json:"id"`
}

func (q *Queries) UpdateFolderName(ctx context.Context, arg UpdateFolderNameParams) (Folder, error) {
	row := q.db.QueryRow(ctx, updateFolderName, arg.Name, arg.LastModifiedAt, arg.ID)
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
	FullPath []Path    `json:"fullPath"`
	ID       uuid.UUID `json:"id"`
}

func (q *Queries) UpdateFullPath(ctx context.Context, arg UpdateFullPathParams) error {
	_, err := q.db.Exec(ctx, updateFullPath, arg.FullPath, arg.ID)
	return err
}
