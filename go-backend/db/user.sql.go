// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.20.0
// source: user.sql

package db

import (
	"context"

	"github.com/google/uuid"
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
	row := q.db.QueryRowContext(ctx, createUser, arg.Email, arg.Password, arg.Name)
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

func (q *Queries) GetUser(ctx context.Context, arg GetUserParams) (uuid.UUID, error) {
	row := q.db.QueryRowContext(ctx, getUser, arg.Email, arg.Password)
	var id uuid.UUID
	err := row.Scan(&id)
	return id, err
}
