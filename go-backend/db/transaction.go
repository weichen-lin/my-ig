package db

import (
	"context"
	"database/sql"
	"fmt"
)

type Transaction struct {
	db *sql.DB
}

func NewTransaction(db *sql.DB) *Transaction {
	return &Transaction{
		db: db,
	}
}

func (transaction *Transaction) ExecTx(ctx context.Context, fn func(tx *sql.Tx) error, needRollback bool) error {
	tx, txerr := transaction.db.BeginTx(ctx, nil)

	if txerr != nil {
		return txerr
	}

	err := fn(tx)
	if err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
		}
		return err
	}

	if needRollback {
		return tx.Rollback()
	} else {
		return tx.Commit()
	}
}
