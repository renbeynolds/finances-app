package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type InvestmentAccountRepository interface {
	Insert(account model.InvestmentAccount) model.InvestmentAccount
	Update(account model.InvestmentAccount) model.InvestmentAccount
	FindAll() []model.InvestmentAccount
	FindByID(accountId uint) (model.InvestmentAccount, error)
}
