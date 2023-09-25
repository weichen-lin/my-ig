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
	-database "postgresql://root:test_local@localhost:5432/myig?sslmode=disable" \
	-verbose \
	up

migrate-down:
	migrate \
	-path db/migration \
	-database "postgresql://root:test_local@localhost:5432/myig?sslmode=disable" \
	-verbose \
	down

sqlc:
	sqlc generate

format:
	find $(PWD) -name "*.go" -exec gofmt -w {} \;