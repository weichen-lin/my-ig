-- name: GetFolder :one
SELECT * FROM "folder" WHERE id = $1;

-- name: CreateFolder :one
INSERT INTO "folder" (name, locate_at, depth, user_id) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdateFullPath :exec
UPDATE "folder" SET full_path = $1 WHERE id = $2 RETURNING *;

-- name: CheckFolderExist :one
SELECT * FROM "folder" WHERE locate_at = $1 AND name = $2 AND user_id = $3;

-- name: UpdateFolderName :one
UPDATE "folder" SET name = $1, last_modified_at = $2 WHERE id = $3 RETURNING *;

-- name: MoveFolder :one
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
	*;

-- name: DeleteFolder :exec
DELETE FROM "folder" WHERE id = $1 and user_id = $2;

-- name: SelectFolders :many
SELECT id, name, last_modified_at FROM "folder" WHERE locate_at = $1 AND user_id = $2 AND is_deleted = FALSE ORDER BY last_modified_at ASC;

-- name: UpdateFoldersDeleted :exec
UPDATE "folder" SET is_deleted = True WHERE user_id = $1 AND id = any(sqlc.arg('ids')::uuid[]);