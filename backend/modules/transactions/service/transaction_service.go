package service

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/transactions/dto"
	"github.com/renbeynolds/finances-app/modules/transactions/repository"
	"gorm.io/gorm"
)

type TransactionService interface {
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

func (s *transactionService) UpdateTransaction(ctx context.Context, req dto.UpdateTransactionRequest, id uint) (dto.TransactionResponse, error) {
	// Get the existing transaction
	transaction, err := s.transactionRepository.GetTransactionByID(ctx, s.db, id)
	if err != nil {
		return dto.TransactionResponse{}, err
	}

	// Update only the fields that are provided
	if req.CategoryID != nil {
		transaction.CategoryID = req.CategoryID
	}
	if req.Comment != nil {
		transaction.Comment = req.Comment
	}

	// Save the updated transaction
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
