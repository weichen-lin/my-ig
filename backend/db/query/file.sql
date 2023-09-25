-- name: CreateFile :one
INSERT INTO "file" (name, url, user_id, locate_at) VALUES ($1, $2, $3, $4) RETURNING *;