package controller

import (
	"database/sql"
	"os"
	"testing"

	_ "github.com/lib/pq"

	"github.com/weichen-lin/myig/util"
)

var conn *sql.DB

func TestMain(m *testing.M) {
	config, err := util.Loadconfig("../", "test")
	if err != nil {
		panic(err)
	}

	conn, err = sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		panic(err)
	}

	os.Exit(m.Run())
}
