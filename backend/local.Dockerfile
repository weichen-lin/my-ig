FROM --platform=linux/amd64 golang:1.21.0-alpine

WORKDIR /app

ENV KUSHARE_APP_ENV=
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=myigroot
ENV POSTGRES_DB=development
EXPOSE 8000

COPY . .

RUN go mod download
RUN go install github.com/cosmtrek/air@latest

## postgresql-client
RUN apk --no-cache add postgresql-client curl

## migrate
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.16.2/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate /usr/bin/migrate && \
    which migrate

## migrate up
RUN chmod +x ./migrate.sh
RUN sh migrate.sh

CMD [ "start.sh" ]