package db

import (
	"context"
	"database/sql"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/weichen-lin/myig/util"
)

func Test_Createuser(t *testing.T) {

	tx := NewTransaction(conn)

	hashedPwd, err := util.HashPassword("123456")
	require.NoError(t, err)

	arg := CreateUserParams{
		Email:    "test@gmail.com",
		Password: hashedPwd,
		Name:     "test",
	}

	tx.ExecTx(context.Background(), func(tx *sql.Tx) error {
		q := New(tx)

		user, err := q.CreateUser(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, user)
		err = util.ComparePassword(user.Password, "123456")
		require.NoError(t, err)

		return nil
	}, true)
}
