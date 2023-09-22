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
  "full_path" _jsonb[],
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

CREATE OR REPLACE FUNCTION public.set_folder_full_path (folder_id uuid)
	RETURNS jsonb []
	LANGUAGE plpgsql
	AS $function$
BEGIN
	RETURN (WITH RECURSIVE source AS ((
				SELECT
					id,
					name,
					locate_at,
					depth
				FROM
					"folder"
				WHERE
					id = folder_id)
			UNION (
				SELECT
					f.id,
					f.name,
					f.locate_at,
					f.depth
				FROM
					folder f
					JOIN source ON f.id = source.locate_at))
		SELECT
			array_agg(json_build_object('depth',
					s.depth,
					'id',
					s.id,
					'name',
					s.name)) AS record
		FROM
			source s
);
END;
$function$