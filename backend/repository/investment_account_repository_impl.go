package repository

import (
	"fmt"

	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util"
	"gorm.io/gorm"
)

type InvestmentAccountRepositoryImpl struct {
	Db *gorm.DB
}

func NewInvestmentAccountRepositoryImpl(Db *gorm.DB) InvestmentAccountRepository {
	return &InvestmentAccountRepositoryImpl{Db: Db}
}

func (r *InvestmentAccountRepositoryImpl) Insert(account model.InvestmentAccount) model.InvestmentAccount {
	result := r.Db.Create(&account)
	util.ErrorPanic(result.Error)
	return account
}

func (r *InvestmentAccountRepositoryImpl) Update(account model.InvestmentAccount) model.InvestmentAccount {
	result := r.Db.Save(&account)
	util.ErrorPanic(result.Error)
	return account
}

func (r *InvestmentAccountRepositoryImpl) FindAll() []model.InvestmentAccount {
	var accounts []model.InvestmentAccount
	r.Db.Find(&accounts)
	if accounts == nil {
		return []model.InvestmentAccount{}
	}
	return accounts
}

func (r *InvestmentAccountRepositoryImpl) FindByID(accountId uint) (model.InvestmentAccount, error) {
	var account model.InvestmentAccount
	result := r.Db.Find(&account, accountId)
	if result != nil {
		return account, nil
	} else {
		return account, fmt.Errorf("account not found")
	}
}
