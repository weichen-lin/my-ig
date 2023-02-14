include .dev.env

run-postgre:
	docker run --rm -v my-ig:/var/lib/postgresql/data -it -dp 5432:5432 --name myig-sql -e POSTGRES_PASSWORD=yourasdasdaspassword postgres:13-alpine

exec-postgre:
	docker exec -it ${MYIG_DB_HOST} psql ${MYIG_DB_NAME} ${MYIG_DB_USER}

dev-up:
	docker compose -f dev.docker-compose.yml --env-file .dev.env up

dev-down:
	docker compose -f dev.docker-compose.yml --env-file .dev.env down
