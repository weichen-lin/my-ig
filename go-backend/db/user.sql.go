// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.20.0
// source: user.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
INSERT INTO "user" (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, password, name, avatar_url, created_at, last_modified_at
`

type CreateUserParams struct {
	Email    string
	Password string
	Name     string
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser, arg.Email, arg.Password, arg.Name)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Password,
		&i.Name,
		&i.AvatarUrl,
		&i.CreatedAt,
		&i.LastModifiedAt,
	)
	return i, err
}

const getUser = `-- name: GetUser :one
SELECT ID FROM "user" WHERE email = $1 and password= $2
`

type GetUserParams struct {
	Email    string
	Password string
}

func (q *Queries) GetUser(ctx context.Context, arg GetUserParams) (pgtype.UUID, error) {
	row := q.db.QueryRow(ctx, getUser, arg.Email, arg.Password)
	var id pgtype.UUID
	err := row.Scan(&id)
	return id, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT ID, email, password FROM "user" WHERE email = $1
`

type GetUserByEmailRow struct {
	ID       pgtype.UUID
	Email    string
	Password string
}

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (GetUserByEmailRow, error) {
	row := q.db.QueryRow(ctx, getUserByEmail, email)
	var i GetUserByEmailRow
	err := row.Scan(&i.ID, &i.Email, &i.Password)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT ID, email, name, avatar_url FROM "user" WHERE id = $1
`

type GetUserByIdRow struct {
	ID        pgtype.UUID
	Email     string
	Name      string
	AvatarUrl *string
}

func (q *Queries) GetUserById(ctx context.Context, id pgtype.UUID) (GetUserByIdRow, error) {
	row := q.db.QueryRow(ctx, getUserById, id)
	var i GetUserByIdRow
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Name,
		&i.AvatarUrl,
	)
	return i, err
}

const updateUserAvatar = `-- name: UpdateUserAvatar :exec
UPDATE "user" SET avatar_url = $1 WHERE id = $2 RETURNING id, email, password, name, avatar_url, created_at, last_modified_at
`

type UpdateUserAvatarParams struct {
	AvatarUrl *string
	ID        pgtype.UUID
}

func (q *Queries) UpdateUserAvatar(ctx context.Context, arg UpdateUserAvatarParams) error {
	_, err := q.db.Exec(ctx, updateUserAvatar, arg.AvatarUrl, arg.ID)
	return err
}
