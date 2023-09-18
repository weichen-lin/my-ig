package db

import (
	"context"
	"os"
	"testing"

	"github.com/jackc/pgx/v5"
	"github.com/weichen-lin/myig/util"
)

var conn *pgx.Conn

func TestMain(m *testing.M) {
	config, err := util.Loadconfig("../", "test")
	if err != nil {
		panic(err)
	}

	conn, err = pgx.Connect(context.Background(), config.DBSource)
	if err != nil {
		panic(err)
	}

	os.Exit(m.Run())
}