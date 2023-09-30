package main

import (
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/weichen-lin/myig/util"
)

func Test_Getfirebase(t *testing.T) {
	firebase, err := util.GetFirebase("test")
	require.NotEmpty(t, firebase)
	require.NoError(t, err)
}