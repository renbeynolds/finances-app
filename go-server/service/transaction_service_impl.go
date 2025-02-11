package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/util/filter"
	"github.com/renbeynolds/finances-app/util/paginate"
)

type TransactionServiceImpl struct {
	TransactionRepository repository.TransactionRepository
	Validate              *validator.Validate
}

func NewTransactionServiceImpl(categoryRepository repository.TransactionRepository) TransactionService {
	return &TransactionServiceImpl{
		TransactionRepository: categoryRepository,
	}
}

func (t *TransactionServiceImpl) FindAll(pagination *paginate.Pagination, dateFilter *filter.DateFilter) []response.TransactionResponse {
	result := t.TransactionRepository.FindAll(pagination, dateFilter)

	var transactions []response.TransactionResponse
	for _, value := range result {
		transaction := response.TransactionResponse{
			Id:          int(value.ID),
			Date:        value.Date.Format("2006-01-02"),
			Description: value.Description,
			Amount:      value.Amount,
			Balance:     value.Balance,
		}
		if value.CategoryID != nil {
			transaction.CategoryId = *value.CategoryID
		}
		if value.Comment != nil {
			transaction.Comment = *value.Comment
		}
		transactions = append(transactions, transaction)
	}

	return transactions
}
