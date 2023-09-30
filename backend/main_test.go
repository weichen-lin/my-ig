package main

import (
	"os"
	"testing"

	"github.com/weichen-lin/myig/util"
)

func TestMain(m *testing.M) {
	_, err := util.GetFirebase("test")
	if err != nil {
		panic(err)
	}

	os.Exit(m.Run())
}
