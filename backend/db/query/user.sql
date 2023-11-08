-- name: CreateUser :one
INSERT INTO "user" (email, password, name) VALUES ($1, $2, $3) RETURNING *;

-- name: CreateUserWithoutName :one
INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING *;

-- name: GetUser :one
SELECT ID FROM "user" WHERE email = $1 and password= $2;

-- name: GetUserByEmail :one
SELECT ID, email, password FROM "user" WHERE email = $1;

-- name: GetUserById :one
SELECT ID, email, name, avatar_url, is_validate FROM "user" WHERE id = $1;

-- name: UpdateUserAvatar :exec
UPDATE "user" SET avatar_url = $1 WHERE id = $2 RETURNING *;

-- name: SelectUserByIdForValidate :one
SELECT ID, email, is_validate FROM "user" WHERE id = $1 FOR UPDATE;

-- name: UpdateUserValidate :exec
UPDATE "user" SET is_validate = $1 WHERE id = $2 RETURNING *;