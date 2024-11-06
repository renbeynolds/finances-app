package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type AccountRepository interface {
	FindAll() []model.Account
}