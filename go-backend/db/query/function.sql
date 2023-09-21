-- name: getLocateAt :one
SELECT * FROM set_default_locate($1, $2);