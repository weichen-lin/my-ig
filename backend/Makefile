GIT_SHA := $(shell git rev-parse --short HEAD)
NAMESPACE := weichen-lin
REPO_NAME := my-ig
TAG := $(GIT_SHA)
IMAGE_BASE := ghcr.io/$(NAMESPACE)/$(REPO_NAME)

run_ig_postgres:
	docker run -d \
	--name myig \
	-p 5432:5432 \
	-e POSTGRES_USER=root \
	-e POSTGRES_PASSWORD=test_local \
	-e POSTGRES_DB=myig \
	postgres:13-alpine

migrate-up:
	migrate \
	-path db/migration \
	-database "postgresql://myigroot:myigrootpwd@localhost:5432/development?sslmode=disable" \
	-verbose \
	up

migrate-down:
	migrate \
	-path db/migration \
	-database "postgresql://myigroot:myigrootpwd@localhost:5432/development?sslmode=disable" \
	-verbose \
	down

sqlc:
	sqlc generate

format:
	find $(PWD) -name "*.go" -exec gofmt -w {} \;

test:
	go test -v -cover ./...

build-dev:
	docker build -t $(IMAGE_BASE):dev -f dev.Dockerfile.dev .

push-dev:
	docker push $(IMAGE_BASE):dev

run-dev:
	docker run -it --rm \
	--name myig-dev \
	-v $(PWD):/app \
	-p 8080:8080 \
	-e POSTGRES_USERNAME=myigroot \
	-e POSTGRES_PASSWORD=myigrootpwd \
	-e POSTGRES_NAME=development \
	-e POSTGRES_HOST=localhost \
	-e POSTGRES_PORT=5432 \
	-e POSTGRES_SSLMODE=disable \
	golang:1.21.0-alpine \
	sh
