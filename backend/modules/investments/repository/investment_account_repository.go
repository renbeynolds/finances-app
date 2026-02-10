package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/investments/dto"
	"gorm.io/gorm"
)

type (
	InvestmentAccountRepository interface {
		CreateInvestmentAccount(ctx context.Context, tx *gorm.DB, investmentAccount entities.InvestmentAccount) (entities.InvestmentAccount, error)
		GetAllInvestmentAccounts(ctx context.Context, tx *gorm.DB) ([]entities.InvestmentAccount, error)
		GetInvestmentAccountByID(ctx context.Context, tx *gorm.DB, id uint) (entities.InvestmentAccount, error)
		UpdateInvestmentAccount(ctx context.Context, tx *gorm.DB, investmentAccount entities.InvestmentAccount) (entities.InvestmentAccount, error)
		GetBalanceOverTime(ctx context.Context, tx *gorm.DB, id uint, from, to string) ([]dto.BalanceOverTimeResponse, error)
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

func (r *investmentAccountRepository) GetBalanceOverTime(ctx context.Context, tx *gorm.DB, id uint, from, to string) ([]dto.BalanceOverTimeResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var results []dto.BalanceOverTimeResponse

	tx.Raw(`
    WITH calendar AS (
      SELECT bucket::date AS day FROM generate_series(?::date, ?::date, '-10 day'::interval) bucket
    )
    SELECT
      c.day AS date,
      (
        SELECT balance
        FROM investment_account_balances iab
        WHERE iab.date <= c.day AND iab.investment_account_id = ? AND iab.deleted_at IS NULL
        ORDER BY iab.date DESC
        LIMIT 1
      ) AS "amount"
    FROM
    calendar c
    ORDER BY date ASC
	`, to, from, id).Scan(&results)

	return results, nil
}
