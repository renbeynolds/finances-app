package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util/filter"
	"github.com/renbeynolds/finances-app/util/paginate"
)

type TransactionRepository interface {
	FindAll(pagination *paginate.Pagination, filters *filter.TransactionFilters) []model.Transaction
	FindByID(id uint) (*model.Transaction, error)
	Update(transaction *model.Transaction) *model.Transaction
}
