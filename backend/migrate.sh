#!/bin/sh

# Wait for PostgreSQL to be ready
until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB
do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Run database migrations
echo "Running database migrations..."

migrate \
	-path db/migration \
	-database "postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB?sslmode=disable" \
	-verbose \
	up

echo "Database migrations completed!"

# Start the apiserver
echo "Starting apiserver..."
exec "$@"
