ALTER TABLE "file" ADD COLUMN is_deleted boolean NOT NULL DEFAULT false;

CREATE INDEX "file_not_delete_idx" ON "file" (user_id, locate_at, is_deleted);
CREATE INDEX "file_delete_idx" ON "file" (user_id, is_deleted);

CREATE INDEX "folder_not_delete_idx" ON "folder" (user_id, locate_at, is_deleted);
CREATE INDEX "folder_delete_idx" ON "folder" (user_id, is_deleted);

DROP INDEX IF EXISTS "file_locate_at_idx";
DROP INDEX IF EXISTS "file_name_idx";
DROP INDEX IF EXISTS "folder_locate_at_idx";
DROP INDEX IF EXISTS "folder_name_idx";
DROP INDEX IF EXISTS "folder_name_locate_at_idx";