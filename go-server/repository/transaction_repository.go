package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util/filter"
	"github.com/renbeynolds/finances-app/util/paginate"
)

type TransactionRepository interface {
	FindAll(pagination *paginate.Pagination, dateFilter *filter.DateFilter) []model.Transaction
}
