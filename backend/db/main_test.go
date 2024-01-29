package db

import (
	"context"
	"os"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/weichen-lin/myig/util"
)

var pool *pgxpool.Pool

func TestMain(m *testing.M) {
	_, err := util.Loadconfig("../", "test")
	if err != nil {
		panic(err)
	}

	pool, err = pgxpool.New(context.Background(), "postgresql://myigroot:myigrootpwd@localhost:5432/development?sslmode=disable")
	if err != nil {
		panic(err)
	}

	os.Exit(m.Run())
}
