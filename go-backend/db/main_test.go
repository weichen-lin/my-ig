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
	config, err := util.Loadconfig("../", "test")
	if err != nil {
		panic(err)
	}

	pool, err = pgxpool.New(context.Background(), config.DBSource)
	if err != nil {
		panic(err)
	}

	os.Exit(m.Run())
}