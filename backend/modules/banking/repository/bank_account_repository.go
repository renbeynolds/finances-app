package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/gorm"
)

type (
	BankAccountRepository interface {
		GetAllBankAccounts(ctx context.Context, tx *gorm.DB) ([]entities.BankAccount, error)
		GetBankAccountByID(ctx context.Context, tx *gorm.DB, id uint) (entities.BankAccount, error)
	}

	bankAccountRepository struct {
		db *gorm.DB
	}
)

func NewBankAccountRepository(db *gorm.DB) BankAccountRepository {
	return &bankAccountRepository{
		db: db,
	}
}

func (r *bankAccountRepository) GetAllBankAccounts(ctx context.Context, tx *gorm.DB) ([]entities.BankAccount, error) {
	if tx == nil {
		tx = r.db
	}

	var bankAccounts []entities.BankAccount
	if err := tx.WithContext(ctx).Find(&bankAccounts).Error; err != nil {
		return nil, err
	}

	return bankAccounts, nil
}

func (r *bankAccountRepository) GetBankAccountByID(ctx context.Context, tx *gorm.DB, id uint) (entities.BankAccount, error) {
	if tx == nil {
		tx = r.db
	}

	var bankAccount entities.BankAccount
	if err := tx.WithContext(ctx).Where("id = ?", id).Take(&bankAccount).Error; err != nil {
		return entities.BankAccount{}, err
	}

	return bankAccount, nil
}
