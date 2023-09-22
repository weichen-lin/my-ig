-- name: GetFolderFullPath :one
SELECT FROM set_folder_full_path($1);