package repository

import (
	"fmt"

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

func (r *AccountRepositoryImpl) FindById(accountId uint) (model.Account, error) {
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
