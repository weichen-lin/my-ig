#!/bin/bash

# Wait for PostgreSQL to be ready
until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB
do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Run database migrations
echo "Running database migrations..."

make migrate-up

# Start the apiserver
echo "Starting apiserver..."
exec "$@"
