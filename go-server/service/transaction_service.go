package service

import (
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/util/filter"
	"github.com/renbeynolds/finances-app/util/paginate"
)

type TransactionService interface {
	FindAll(pagination *paginate.Pagination, filters *filter.TransactionFilters) []response.TransactionResponse
	Update(transaction request.UpdateTransactionRequest) response.TransactionResponse
}
