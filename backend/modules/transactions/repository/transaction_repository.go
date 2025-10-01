package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/gorm"
)

type (
	TransactionRepository interface {
		GetTransactionByID(ctx context.Context, tx *gorm.DB, id uint) (entities.Transaction, error)
		UpdateTransaction(ctx context.Context, tx *gorm.DB, transaction entities.Transaction) (entities.Transaction, error)
	}

	transactionRepository struct {
		db *gorm.DB
	}
)

func NewTransactionRepository(db *gorm.DB) TransactionRepository {
	return &transactionRepository{
		db: db,
	}
}

func (r *transactionRepository) GetTransactionByID(ctx context.Context, tx *gorm.DB, id uint) (entities.Transaction, error) {
	if tx == nil {
		tx = r.db
	}

	var transaction entities.Transaction
	if err := tx.WithContext(ctx).First(&transaction, id).Error; err != nil {
		return entities.Transaction{}, err
	}

	return transaction, nil
}

func (r *transactionRepository) UpdateTransaction(ctx context.Context, tx *gorm.DB, transaction entities.Transaction) (entities.Transaction, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Save(&transaction).Error; err != nil {
		return entities.Transaction{}, err
	}

	return transaction, nil
}
