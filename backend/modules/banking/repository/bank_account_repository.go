package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/banking/dto"
	"gorm.io/gorm"
)

type (
	BankAccountRepository interface {
		CreateBankAccount(ctx context.Context, tx *gorm.DB, bankAccount entities.BankAccount) (entities.BankAccount, error)
		GetAllBankAccounts(ctx context.Context, tx *gorm.DB) ([]entities.BankAccount, error)
		GetBankAccountByID(ctx context.Context, tx *gorm.DB, id uint) (entities.BankAccount, error)
		UpdateBankAccount(ctx context.Context, tx *gorm.DB, bankAccount entities.BankAccount) (entities.BankAccount, error)
		GetBalanceOverTime(ctx context.Context, tx *gorm.DB, id uint, from, to string) ([]dto.BalanceOverTimeResponse, error)
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

func (r *bankAccountRepository) CreateBankAccount(ctx context.Context, tx *gorm.DB, bankAccount entities.BankAccount) (entities.BankAccount, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Create(&bankAccount).Error; err != nil {
		return entities.BankAccount{}, err
	}

	return bankAccount, nil
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

func (r *bankAccountRepository) UpdateBankAccount(ctx context.Context, tx *gorm.DB, bankAccount entities.BankAccount) (entities.BankAccount, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Updates(&bankAccount).Error; err != nil {
		return entities.BankAccount{}, err
	}

	return bankAccount, nil
}

func (r *bankAccountRepository) GetBalanceOverTime(ctx context.Context, tx *gorm.DB, id uint, from, to string) ([]dto.BalanceOverTimeResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var results []dto.BalanceOverTimeResponse

	tx.Raw(`
    WITH calendar AS (
      SELECT bucket::date AS day FROM generate_series(?, ?, '10 day'::interval) bucket
    )
    SELECT
      c.day AS date,
      (
        SELECT balance
        FROM transactions t
        LEFT JOIN uploads u ON t.upload_id = u.id
        WHERE date < c.day AND u.bank_account_id = ?
        ORDER BY "date" DESC
        LIMIT 1
      ) AS "amount"
    FROM
    calendar c
	`, from, to, id).Scan(&results)

	return results, nil
}
