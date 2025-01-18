package service

import (
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/util/paginate"
)

type TransactionService interface {
	FindAll(pagination *paginate.Pagination) []response.TransactionResponse
}
