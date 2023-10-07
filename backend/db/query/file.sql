-- name: CreateFile :one
INSERT INTO "file" (name, url, user_id, locate_at) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: GetFile :one
SELECT * FROM "file" WHERE id = $1 and user_id = $2;

-- name: SelectFiles :many
SELECT * FROM "file" WHERE locate_at = $1 AND user_id = $2 ORDER BY last_modified_at ASC;