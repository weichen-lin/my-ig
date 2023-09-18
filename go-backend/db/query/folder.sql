-- name: CreateFolder :one
INSERT INTO "folder" (name, locate_at, full_path, user_id) VALUES ($1, $2, $3, $4) RETURNING *;