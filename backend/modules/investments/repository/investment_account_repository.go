package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/gorm"
)

type (
	InvestmentAccountRepository interface {
		CreateInvestmentAccount(ctx context.Context, tx *gorm.DB, investmentAccount entities.InvestmentAccount) (entities.InvestmentAccount, error)
		GetAllInvestmentAccounts(ctx context.Context, tx *gorm.DB) ([]entities.InvestmentAccount, error)
		GetInvestmentAccountByID(ctx context.Context, tx *gorm.DB, id uint) (entities.InvestmentAccount, error)
		UpdateInvestmentAccount(ctx context.Context, tx *gorm.DB, investmentAccount entities.InvestmentAccount) (entities.InvestmentAccount, error)
	}

	investmentAccountRepository struct {
		db *gorm.DB
	}
)

func NewInvestmentAccountRepository(db *gorm.DB) InvestmentAccountRepository {
	return &investmentAccountRepository{
		db: db,
	}
}

func (r *investmentAccountRepository) CreateInvestmentAccount(ctx context.Context, tx *gorm.DB, investmentAccount entities.InvestmentAccount) (entities.InvestmentAccount, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Create(&investmentAccount).Error; err != nil {
		return entities.InvestmentAccount{}, err
	}

	return investmentAccount, nil
}

func (r *investmentAccountRepository) GetAllInvestmentAccounts(ctx context.Context, tx *gorm.DB) ([]entities.InvestmentAccount, error) {
	if tx == nil {
		tx = r.db
	}

	var investmentAccounts []entities.InvestmentAccount
	if err := tx.WithContext(ctx).Find(&investmentAccounts).Error; err != nil {
		return nil, err
	}

	return investmentAccounts, nil
}

func (r *investmentAccountRepository) GetInvestmentAccountByID(ctx context.Context, tx *gorm.DB, id uint) (entities.InvestmentAccount, error) {
	if tx == nil {
		tx = r.db
	}

	var investmentAccount entities.InvestmentAccount
	if err := tx.WithContext(ctx).Where("id = ?", id).Take(&investmentAccount).Error; err != nil {
		return entities.InvestmentAccount{}, err
	}

	return investmentAccount, nil
}

func (r *investmentAccountRepository) UpdateInvestmentAccount(ctx context.Context, tx *gorm.DB, investmentAccount entities.InvestmentAccount) (entities.InvestmentAccount, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Updates(&investmentAccount).Error; err != nil {
		return entities.InvestmentAccount{}, err
	}

	return investmentAccount, nil
}
