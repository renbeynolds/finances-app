package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	queryPkg "github.com/renbeynolds/finances-app/modules/transactions/query"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type (
	TransactionRepository interface {
		GetAllTransactions(ctx context.Context, tx *gorm.DB, pagination *utils.Pagination, query *queryPkg.TransactionQuery) ([]entities.Transaction, error)
		GetFilteredTransactionsTotal(ctx context.Context, tx *gorm.DB, query *queryPkg.TransactionQuery) (int64, error)
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

func (r *transactionRepository) GetAllTransactions(ctx context.Context, tx *gorm.DB, pagination *utils.Pagination, query *queryPkg.TransactionQuery) ([]entities.Transaction, error) {
	if tx == nil {
		tx = r.db
	}

	var transactions []entities.Transaction
	tx.WithContext(ctx).Scopes(
		utils.Paginate(transactions, pagination, tx, queryPkg.QueryTransactions(transactions, query, tx)),
	).Select("transactions.*").Order(clause.OrderBy{Columns: []clause.OrderByColumn{
		{Column: clause.Column{Name: "date"}, Desc: true},
		{Column: clause.Column{Name: "id"}, Desc: true},
	}}).Find(&transactions)

	if transactions == nil {
		return []entities.Transaction{}, nil
	}

	return transactions, nil
}

func (r *transactionRepository) GetFilteredTransactionsTotal(ctx context.Context, tx *gorm.DB, query *queryPkg.TransactionQuery) (int64, error) {
	if tx == nil {
		tx = r.db
	}

	var total int64
	tx.WithContext(ctx).Model(&entities.Transaction{}).Scopes(
		queryPkg.QueryTransactions(nil, query, tx),
	).Select("SUM(amount) as total").Scan(&total)

	return total, nil
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
