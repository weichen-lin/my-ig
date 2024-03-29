FROM --platform=linux/amd64 golang:1.21.0-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main.exe

FROM --platform=linux/amd64 alpine:latest

ENV KUSHARE_APP_ENV=dev

WORKDIR /app

EXPOSE 8000

COPY --from=builder /app/main.exe .
COPY dev.env ./dev.env
COPY credential.json ./credential.json
COPY template ./template

LABEL org.opencontainers.image.source https://github.com/weichen-lin/my-ig

ENTRYPOINT [ "./main.exe" ]