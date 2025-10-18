package service

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/transactions/dto"
	"github.com/renbeynolds/finances-app/modules/transactions/query"
	"github.com/renbeynolds/finances-app/modules/transactions/repository"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"gorm.io/gorm"
)

type TransactionService interface {
	GetAllTransactions(ctx context.Context, pagination *utils.Pagination, query *query.TransactionQuery) ([]dto.TransactionResponse, error)
	GetFilteredTransactionsTotal(ctx context.Context, query *query.TransactionQuery) (dto.TransactionsTotalResponse, error)
	UpdateTransaction(ctx context.Context, req dto.UpdateTransactionRequest, id uint) (dto.TransactionResponse, error)
}

type transactionService struct {
	transactionRepository repository.TransactionRepository
	db                    *gorm.DB
}

func NewTransactionService(
	transactionRepo repository.TransactionRepository,
	db *gorm.DB,
) TransactionService {
	return &transactionService{
		transactionRepository: transactionRepo,
		db:                    db,
	}
}

func (s *transactionService) GetAllTransactions(ctx context.Context, pagination *utils.Pagination, query *query.TransactionQuery) ([]dto.TransactionResponse, error) {
	transactions, err := s.transactionRepository.GetAllTransactions(ctx, s.db, pagination, query)
	if err != nil {
		return nil, err
	}

	var transactionResponses []dto.TransactionResponse
	for _, tx := range transactions {
		transactionResponses = append(transactionResponses, entityToResponse(tx))
	}

	return transactionResponses, nil
}

func (s *transactionService) GetFilteredTransactionsTotal(ctx context.Context, query *query.TransactionQuery) (dto.TransactionsTotalResponse, error) {
	total, err := s.transactionRepository.GetFilteredTransactionsTotal(ctx, s.db, query)
	return dto.TransactionsTotalResponse{
		Total: total,
	}, err
}

func (s *transactionService) UpdateTransaction(ctx context.Context, req dto.UpdateTransactionRequest, id uint) (dto.TransactionResponse, error) {
	transaction, err := s.transactionRepository.GetTransactionByID(ctx, s.db, id)
	if err != nil {
		return dto.TransactionResponse{}, err
	}

	if req.CategoryID != nil {
		transaction.CategoryID = req.CategoryID
	}
	if req.Comment != nil {
		transaction.Comment = req.Comment
	}

	updatedTransaction, err := s.transactionRepository.UpdateTransaction(ctx, s.db, transaction)
	if err != nil {
		return dto.TransactionResponse{}, err
	}

	return entityToResponse(updatedTransaction), nil
}

func entityToResponse(transaction entities.Transaction) dto.TransactionResponse {
	comment := ""
	if transaction.Comment != nil {
		comment = *transaction.Comment
	}

	return dto.TransactionResponse{
		ID:          transaction.ID,
		UploadID:    transaction.UploadID,
		CategoryID:  transaction.CategoryID,
		Date:        transaction.Date.Format("2006-01-02"),
		Description: transaction.Description,
		Comment:     comment,
		Amount:      transaction.Amount,
		Balance:     transaction.Balance,
	}
}
