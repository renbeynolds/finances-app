package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/gorm"
)

type (
	InvestmentBalanceRepository interface {
		CreateInvestmentBalance(ctx context.Context, tx *gorm.DB, investmentBalance entities.InvestmentAccountBalance) (entities.InvestmentAccountBalance, error)
	}

	investmentBalanceRepository struct {
		db *gorm.DB
	}
)

func NewInvestmentBalanceRepository(db *gorm.DB) InvestmentBalanceRepository {
	return &investmentBalanceRepository{
		db: db,
	}
}

func (r *investmentBalanceRepository) CreateInvestmentBalance(ctx context.Context, tx *gorm.DB, investmentBalance entities.InvestmentAccountBalance) (entities.InvestmentAccountBalance, error) {
	if err := tx.WithContext(ctx).Create(&investmentBalance).Error; err != nil {
		return entities.InvestmentAccountBalance{}, err
	}
	return investmentBalance, nil
}
