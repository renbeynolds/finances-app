package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type AccountRepository interface {
	Insert(account model.Account) model.Account
	Update(account model.Account) model.Account
	FindById(accountId uint) (model.Account, error)
	FindAll() []model.Account
}
