FROM --platform=linux/amd64 golang:1.21.0-alpine

WORKDIR /app

ENV KUSHARE_APP_ENV=
ENV POSTGRES_HOST=myig-postgres
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=myigroot
ENV POSTGRES_DB=development
ENV POSTGRES_PASSWORD=myigrootpwd

COPY . .

RUN go mod download
RUN go install github.com/cosmtrek/air@latest

RUN apk add --no-cache curl postgresql-client

## migrate
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.16.2/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate /usr/bin/migrate && \
    which migrate

## migrate up
RUN chmod +x migrate.sh start.sh

CMD [ "./start.sh" ]