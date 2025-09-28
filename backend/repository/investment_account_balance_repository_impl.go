package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util"
	"gorm.io/gorm"
)

type InvestmentAccountBalanceRepositoryImpl struct {
	Db *gorm.DB
}

func NewInvestmentAccountBalanceRepositoryImpl(Db *gorm.DB) InvestmentAccountBalanceRepository {
	return &InvestmentAccountBalanceRepositoryImpl{Db: Db}
}

func (r *InvestmentAccountBalanceRepositoryImpl) Insert(account model.InvestmentAccountBalance) model.InvestmentAccountBalance {
	result := r.Db.Create(&account)
	util.ErrorPanic(result.Error)
	return account
}
