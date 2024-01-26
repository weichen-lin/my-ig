FROM --platform=linux/amd64 golang:1.21.0-alpine

WORKDIR /app

ENV KUSHARE_APP_ENV=
EXPOSE 8000

COPY . .

RUN go mod download
RUN go install github.com/cosmtrek/air@latest

ENTRYPOINT [ "air" ]