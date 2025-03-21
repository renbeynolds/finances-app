package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/util"
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

func (t *TransactionServiceImpl) FindAll(pagination *paginate.Pagination, filters *filter.TransactionFilters) []response.TransactionResponse {
	result := t.TransactionRepository.FindAll(pagination, filters)

	var transactions []response.TransactionResponse
	for _, value := range result {
		transaction := response.TransactionResponse{
			Id:          int(value.ID),
			UploadId:    int(value.UploadID),
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

func (t *TransactionServiceImpl) Update(transaction request.UpdateTransactionRequest) response.TransactionResponse {
	transactionData, err := t.TransactionRepository.FindByID(transaction.ID)
	util.ErrorPanic(err)
	transactionData.CategoryID = transaction.CategoryID
	transactionData.Comment = transaction.Comment
	updatedTransaction := t.TransactionRepository.Update(transactionData)

	response := response.TransactionResponse{
		Id:          int(updatedTransaction.ID),
		UploadId:    int(updatedTransaction.UploadID),
		Date:        updatedTransaction.Date.Format("2006-01-02"),
		Description: updatedTransaction.Description,
		Amount:      updatedTransaction.Amount,
		Balance:     updatedTransaction.Balance,
	}
	if updatedTransaction.CategoryID != nil {
		response.CategoryId = *updatedTransaction.CategoryID
	}
	if updatedTransaction.Comment != nil {
		response.Comment = *updatedTransaction.Comment
	}

	return response
}

func (t *TransactionServiceImpl) GetFilteredTransactionsTotal(filters *filter.TransactionFilters) int64 {
	return t.TransactionRepository.GetFilteredTransactionsTotal(filters)
}
