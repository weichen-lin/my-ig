include .env.local

run-postgre:
	docker run --rm \
	-v my-ig-postgre:/var/lib/postgresql/data \
	-it \
	-dp 5432:5432 \
	--name ${MYIG_DB_HOST} \
	-e POSTGRES_DB=${MYIG_DB_NAME} \
	-e POSTGRES_USER=${MYIG_DB_USER} \
	-e POSTGRES_PASSWORD=myigrootpwd \
	postgres:13-alpine \

exec-postgre:
	docker exec -it ${MYIG_DB_HOST} psql ${MYIG_DB_NAME} ${MYIG_DB_USER}

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
	--rm \
	-p 9000:9000 -p 9001:9001 \
	-v $$HOME/Desktop/minio:/data \
	minio/minio:latest \
	server \
	/data \
	--console-address ":9001"

local-up-all:
	docker compose -f local.docker-compose.yml --env-file .env.local up

local-up-backend:
	docker compose -f local.docker-compose.yml --env-file .env.local up -d apiserver postgres redis minio

local-down-backend:
	docker compose -f local.docker-compose.yml --env-file .env.local down apiserver postgres redis minio