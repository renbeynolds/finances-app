package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type AccountRepository interface {
	Insert(account model.Account) model.Account
	FindById(accountId int) (model.Account, error)
	FindAll() []model.Account
}