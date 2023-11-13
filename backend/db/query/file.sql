-- name: CreateFile :one
INSERT INTO "file" (name, url, user_id, locate_at) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: GetFile :one
SELECT * FROM "file" WHERE id = $1 and user_id = $2;

-- name: SelectFiles :many
SELECT id, name, last_modified_at FROM "file" WHERE locate_at = $1 AND user_id = $2 ORDER BY last_modified_at ASC;

-- name: SelectFileDescription :one
SELECT description FROM "file" WHERE id = $1 AND user_id = $2;

-- name: UpdateFileDescription :exec
UPDATE "file" SET description = $1 WHERE id = $2 AND user_id = $3;

-- name: RenameFile :one
UPDATE "file" SET name = $1, last_modified_at = $2 WHERE id = $3 AND user_id = $4 RETURNING *;

-- name: DeleteFiles :exec
DELETE FROM "file" WHERE user_id = $1 AND id IN (sqlc.slice('ids')::uuid[]);
