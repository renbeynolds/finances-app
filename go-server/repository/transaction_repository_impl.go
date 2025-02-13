package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util/filter"
	"github.com/renbeynolds/finances-app/util/paginate"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type TransactionRepositoryImpl struct {
	Db *gorm.DB
}

func NewTransactionRepositoryImpl(Db *gorm.DB) TransactionRepository {
	return &TransactionRepositoryImpl{Db: Db}
}

func (r *TransactionRepositoryImpl) FindAll(pagination *paginate.Pagination, filters *filter.TransactionFilters) []model.Transaction {
	var transactions []model.Transaction
	r.Db.Scopes(
		paginate.Paginate(transactions, pagination, r.Db, filter.FilterTransactions(transactions, filters, r.Db)),
	).Order(clause.OrderBy{Columns: []clause.OrderByColumn{
		{Column: clause.Column{Name: "date"}, Desc: true},
		{Column: clause.Column{Name: "id"}, Desc: true},
	}}).Find(&transactions)
	return transactions
}
