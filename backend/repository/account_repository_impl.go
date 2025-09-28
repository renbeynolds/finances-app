package repository

import (
	"fmt"

	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util"
	"gorm.io/gorm"
)

type AccountRepositoryImpl struct {
	Db *gorm.DB
}

func NewAccountRepositoryImpl(Db *gorm.DB) AccountRepository {
	return &AccountRepositoryImpl{Db: Db}
}

func (r *AccountRepositoryImpl) Insert(account model.Account) model.Account {
	result := r.Db.Create(&account)
	util.ErrorPanic(result.Error)
	return account
}

func (r *AccountRepositoryImpl) Update(account model.Account) model.Account {
	result := r.Db.Save(&account)
	util.ErrorPanic(result.Error)
	return account
}

func (r *AccountRepositoryImpl) FindByID(accountId uint) (model.Account, error) {
	var account model.Account
	result := r.Db.Find(&account, accountId)
	if result != nil {
		return account, nil
	} else {
		return account, fmt.Errorf("account not found")
	}
}

func (r *AccountRepositoryImpl) FindAll() []model.Account {
	var accounts []model.Account
	r.Db.Find(&accounts)
	if accounts == nil {
		return []model.Account{}
	}
	return accounts
}

func (r *AccountRepositoryImpl) GetBalanceOverTime(accountId uint, from, to string) []response.AmountOverTimeResponse {
	var results []response.AmountOverTimeResponse
	r.Db.Raw(`
    WITH calendar AS (
      SELECT bucket::date AS day FROM generate_series(?, ?, '10 day'::interval) bucket
    )
    SELECT
      c.day AS date,
      (
        SELECT balance
        FROM transactions t
        LEFT JOIN uploads u ON t.upload_id = u.id
        WHERE date < c.day AND u.account_id = ?
        ORDER BY "date" DESC
        LIMIT 1
      ) AS "amount"
    FROM
    calendar c
	`, from, to, accountId).Scan(&results)
	return results
}
