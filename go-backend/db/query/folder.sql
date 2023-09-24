-- name: GetFolder :one
SELECT * FROM "folder" WHERE id = $1;

-- name: CreateFolder :one
INSERT INTO "folder" (name, locate_at, depth, user_id) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdateFullPath :exec
UPDATE "folder" SET full_path = $1 WHERE id = $2 RETURNING *;

-- name: CheckFolderExist :one
SELECT * FROM "folder" WHERE locate_at = $1 AND name = $2 AND user_id = $3;