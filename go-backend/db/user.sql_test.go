package db

import (
	"context"
	"database/sql"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/require"
	"github.com/weichen-lin/myig/util"
)

type UserWithRealPwd struct {
	*User
	RealPwd string
}

func createUserForTest(ctx context.Context) (UserWithRealPwd, error) {
	var err error
	var user UserWithRealPwd
	transaction := NewTransaction(conn)
	tx, err := transaction.db.BeginTx(ctx, nil)

	if err != nil {
		return user, err
	}

	q := New(tx)

	fakePwd := faker.Password()[:10]
	hashedPwd, err := util.HashPassword(fakePwd)
	if err != nil {
		return user, err
	}

	arg := CreateUserParams{
		Email:    faker.Email(),
		Password: hashedPwd,
		Name:     faker.Username(),
	}

	userFromDB, err := q.CreateUser(context.Background(), arg)
	if err != nil {
		tx.Rollback()
		return user, err
	}

	user = UserWithRealPwd{
		User:    &userFromDB,
		RealPwd: fakePwd,
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return user, err
	}

	return user, nil
}
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
	}, true)
}

func Test_Getuser(t *testing.T) {
	var userWithPWD UserWithRealPwd
	var err error

	userWithPWD, err = createUserForTest(context.Background())
	t.Log(userWithPWD)
	require.NoError(t, err)
	require.NotEmpty(t, userWithPWD.User)
	require.NotEmpty(t, userWithPWD.RealPwd)

	tx := NewTransaction(conn)

	arg := GetUserParams{
		Email:    userWithPWD.User.Email,
		Password: userWithPWD.User.Password,
	}

	tx.ExecTx(context.Background(), func(tx *sql.Tx) error {
		q := New(tx)

		ID, err := q.GetUser(context.Background(), arg)
		require.NoError(t, err)
		require.NotEmpty(t, ID)
		require.Equal(t, ID.String(), userWithPWD.User.ID.String())

		return nil
	}, false)
}
