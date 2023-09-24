package db

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func Test_GetFolderFullPath(t *testing.T) {
	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	folderId, err := uuid.Parse("3174d38e-4c16-40c3-880c-ed64b34d3877")
	require.NoError(t, err)

	fullPath, err := q.GetFolderFullPath(context.Background(), folderId)
	t.Log(fullPath)
	require.Error(t, err)
}
