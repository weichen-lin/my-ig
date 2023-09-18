package db

import (
	"context"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/require"
	"github.com/weichen-lin/myig/util"
)

type UserWithRealPwd struct {
	User
	RealPwd string
}

func createUserForTest(ctx context.Context) (UserWithRealPwd, error) {
	var err error
	var user UserWithRealPwd
	tx, err := pool.Begin(ctx)
	if err != nil {
		return user, err
	}

	q := New(tx)

	pwdBeforeBcrypt := faker.Password()[:10]
	hashedPwd, err := util.HashPassword(pwdBeforeBcrypt)
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
		tx.Rollback(ctx)
		return user, err
	}

	user = UserWithRealPwd{
		userFromDB,
		pwdBeforeBcrypt,
	}

	err = tx.Commit(ctx)
	if err != nil {
		tx.Rollback(ctx)
		return user, err
	}

	return user, nil
}

func Test_Createuser(t *testing.T) {

	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	fakePwd := faker.Password()[:10]

	hashedPwd, err := util.HashPassword(fakePwd)
	require.NoError(t, err)

	arg := CreateUserParams{
		Email:    faker.Email(),
		Password: hashedPwd,
		Name:     faker.Username(),
	}

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
}

func Test_GetUser(t *testing.T) {
	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	var userWithPWD UserWithRealPwd

	userWithPWD, err = createUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, userWithPWD.User)
	require.NotEmpty(t, userWithPWD.RealPwd)

	arg := GetUserParams{
		Email:    userWithPWD.Email,
		Password: userWithPWD.Password,
	}

	ID, err := q.GetUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, ID)
	require.Equal(t, ID, userWithPWD.ID)
}

func Test_GetUserByEmail(t *testing.T) {
	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	var userWithPWD UserWithRealPwd

	userWithPWD, err = createUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, userWithPWD.User)
	require.NotEmpty(t, userWithPWD.RealPwd)

	info, err := q.GetUserByEmail(context.Background(), userWithPWD.Email)

	require.NoError(t, err)
	require.NotEmpty(t, info)
	require.Equal(t, info.ID, userWithPWD.ID)
	require.Equal(t, info.Email, userWithPWD.Email)
	require.NotEqual(t, info.Password, userWithPWD.RealPwd)

	checkErr := util.ComparePassword(info.Password, userWithPWD.RealPwd)
	require.NoError(t, checkErr)
}

func Test_UpdateUserAvatar(t *testing.T) {
	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)

	var userWithPWD UserWithRealPwd

	userWithPWD, err = createUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, userWithPWD.User)
	require.NotEmpty(t, userWithPWD.RealPwd)

	f := faker.URL()
	params := UpdateUserAvatarParams{
		AvatarUrl: &f,
		ID:        userWithPWD.ID,
	}

	err = q.UpdateUserAvatar(context.Background(), params)
	require.NoError(t, err)

	user, err := q.GetUserById(context.Background(), params.ID)
	require.NoError(t, err)
	require.NotEmpty(t, user)

	require.Equal(t, params.AvatarUrl, user.AvatarUrl)
	require.Equal(t, params.ID, user.ID)
}

func Test_GetUserById(t *testing.T) {
	tx, err := pool.Begin(context.Background())
	require.NoError(t, err)

	q := New(tx)
	var userWithPWD UserWithRealPwd

	userWithPWD, err = createUserForTest(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, userWithPWD.User)
	require.NotEmpty(t, userWithPWD.RealPwd)

	user, err := q.GetUserById(context.Background(), userWithPWD.ID)
	require.NoError(t, err)
	require.NotEmpty(t, user)

	require.Equal(t, userWithPWD.Email, user.Email)
	require.Equal(t, userWithPWD.Name, user.Name)
	require.Equal(t, userWithPWD.ID, user.ID)
	require.Equal(t, userWithPWD.AvatarUrl, user.AvatarUrl)
}
