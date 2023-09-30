package util

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_LoadConfig(t *testing.T) {
	config, err := Loadconfig("../", "test")
	require.NoError(t, err)

	require.Equal(t, "postgres", config.DBDriver)
	require.Equal(t, "postgresql://root:test_local@localhost:5432/myig?sslmode=disable", config.DBSource)
	require.Equal(t, "0.0.0.0:8000", config.ServerAddress)
	require.Equal(t, "AAAAAAAA____secretkeyfortest____AAAAAAAA", config.SecretKey)
	require.Equal(t, "kushare-7abab.appspot.com", config.FireBaseBucket)
}