package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"gorm.io/gorm"
)

type AccountRepositoryImpl struct {
	Db *gorm.DB
}

func NewAccountRepositoryImpl(Db *gorm.DB) AccountRepository {
	return &AccountRepositoryImpl{Db: Db}
}

func (r AccountRepositoryImpl) FindAll() []model.Account {
	var Accounts []model.Account
	r.Db.Find(&Accounts)
	return Accounts
}