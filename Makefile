include .dev.env

BACKEND_IMAGE=asia.gcr.io/my-ig-375608/ig-backend
FRONTEND_IMAGE=asia.gcr.io/my-ig-375608/ig-frontend

run-postgre:
	docker run --rm -v my-ig:/var/lib/postgresql/data -it -dp 5432:5432 --name myig-sql -e POSTGRES_PASSWORD=yourasdasdaspassword postgres:13-alpine

exec-postgre:
	docker exec -it ${MYIG_DB_HOST} psql ${MYIG_DB_NAME} ${MYIG_DB_USER}

dev-up:
	docker compose -f dev.docker-compose.yml --env-file .dev.env up

dev-down:
	docker compose -f dev.docker-compose.yml --env-file .dev.env down

prod-up:
	docker compose -f prod.docker-compose.yml --env-file .dev.env up

prod-down:
	docker compose -f prod.docker-compose.yml --env-file .dev.env down

build-base-image:
	docker build --platform=linux/amd64 -t ${FRONTEND_IMAGE}:prod -f frontend/build/prod.Dockerfile ./frontend

push-base-image:
	docker push ${BACKEND_IMAGE}:base
	docker push ${FRONTEND_IMAGE}:base

build-prod-image:
	docker build --platform=linux/amd64 -t ${BACKEND_IMAGE}:expr -f backend/build/prod.Dockerfile ./backend

push-prod-image:
	docker push ${BACKEND_IMAGE}:latest

run-minio-local:
	docker run \
	-p 9000:9000 -p 9001:9001 \
	-v $$HOME/Desktop/minio:/data \
	minio/minio:RELEASE.2023-08-16T20-17-30Z.hotfix.a51234923 \
	server \
	/data \
	--console-address ":9001"