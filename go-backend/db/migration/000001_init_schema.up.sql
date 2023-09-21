CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "email" varchar(100) NOT NULL,
  "password" varchar(100) NOT NULL,
  "name" varchar(100) NOT NULL,
  "avatar_url" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "last_modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "file" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "name" varchar(100) NOT NULL,
  "url" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "last_modified_at" timestamptz NOT NULL DEFAULT (now()),
  "user_id" uuid NOT NULL,
  "locate_at" uuid
);

CREATE TABLE "folder" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "name" varchar(100) NOT NULL,
  "locate_at" uuid NOT NULL,
  "full_path" _json,
  "depth" INT NOT NULL,
  "is_deleted" bool NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "last_modified_at" timestamptz NOT NULL DEFAULT (now()),
  "user_id" uuid NOT NULL
);

CREATE INDEX ON "user" ("name");

CREATE INDEX ON "user" ("email");

CREATE INDEX ON "file" ("name");

CREATE INDEX ON "file" ("locate_at");

CREATE INDEX ON "folder" ("name");

CREATE INDEX ON "folder" ("locate_at");

CREATE INDEX ON "folder" ("name", "locate_at");

ALTER TABLE "file" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "file" ADD FOREIGN KEY ("locate_at") REFERENCES "folder" ("id");

ALTER TABLE "folder" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

CREATE OR REPLACE FUNCTION set_default_locate(userId uuid, locate_at uuid DEFAULT NULL)
RETURNS uuid
AS $$
BEGIN
	IF locate_at IS NULL THEN
	    RETURN userId;
    ELSE
        return locate_at;
    END IF;
END;
$$ LANGUAGE plpgsql;