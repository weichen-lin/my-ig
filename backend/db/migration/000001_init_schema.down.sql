DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "file" CASCADE;
DROP TABLE IF EXISTS "folder" CASCADE;
DROP FUNCTION IF EXISTS set_default_locate(uuid,uuid);

DROP EXTENSION IF EXISTS "uuid-ossp";