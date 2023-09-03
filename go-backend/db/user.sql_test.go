package db

import (
	"context"
	"database/sql"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/require"
	"github.com/weichen-lin/myig/util"
)

func Test_Createuser(t *testing.T) {

	tx := NewTransaction(conn)

	fakePwd := faker.Password()[:10]

	hashedPwd, err := util.HashPassword(fakePwd)
	require.NoError(t, err)

	arg := CreateUserParams{
		Email:    faker.Email(),
		Password: hashedPwd,
		Name:     faker.Username(),
	}

	tx.ExecTx(context.Background(), func(tx *sql.Tx) error {
		q := New(tx)

		user, err := q.CreateUser(context.Background(), arg)
		t.Log(user)
		require.NoError(t, err)
		require.NotEmpty(t, user)

		require.Equal(t, arg.Email, user.Email)
		require.Equal(t, arg.Name, user.Name)

		require.NotZero(t, user.ID)
		require.NotEmpty(t, user.CreatedAt)
		require.NotEmpty(t, user.LastModifiedAt)

		err = util.ComparePassword(user.Password, fakePwd)
		require.NoError(t, err)

		return nil
	}, false)
}
