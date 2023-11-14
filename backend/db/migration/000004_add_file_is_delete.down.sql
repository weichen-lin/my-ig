ALTER TABLE "file" DROP COLUMN is_deleted;

CREATE INDEX "file_locate_at_idx" ON "file" (locate_at);
CREATE INDEX "file_name_idx" ON "file" (name);
CREATE INDEX "folder_locate_at_idx" ON "folder" (locate_at);
CREATE INDEX "folder_name_idx" ON "folder" (name);
CREATE INDEX "folder_name_locate_at_idx" ON "folder" (name, locate_at);

DROP INDEX IF EXISTS "file_not_delete_idx";
DROP INDEX IF EXISTS "file_delete_idx";
DROP INDEX IF EXISTS "folder_not_delete_idx";
DROP INDEX IF EXISTS "folder_delete_idx";