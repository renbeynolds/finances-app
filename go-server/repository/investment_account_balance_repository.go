package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type InvestmentAccountBalanceRepository interface {
	Insert(account model.InvestmentAccountBalance) model.InvestmentAccountBalance
}
