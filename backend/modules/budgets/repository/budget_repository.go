package repository

import (
	"context"
	"time"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/budgets/dto"
	"gorm.io/gorm"
)

type (
	BudgetRepository interface {
		CreateBudget(ctx context.Context, tx *gorm.DB, budget entities.Budget) (entities.Budget, error)
		GetBudgetByID(ctx context.Context, tx *gorm.DB, id uint) (entities.Budget, error)
		GetAllBudgets(ctx context.Context, tx *gorm.DB) ([]entities.Budget, error)
		UpdateBudget(ctx context.Context, tx *gorm.DB, budget entities.Budget) (entities.Budget, error)
		GetBudgetActuals(ctx context.Context, tx *gorm.DB, startTime, endTime time.Time) ([]dto.BudgetActualResponse, error)
	}

	budgetRepository struct {
		db *gorm.DB
	}
)

func NewBudgetRepository(db *gorm.DB) BudgetRepository {
	return &budgetRepository{
		db: db,
	}
}

func (r *budgetRepository) CreateBudget(ctx context.Context, tx *gorm.DB, budget entities.Budget) (entities.Budget, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Create(&budget).Error; err != nil {
		return entities.Budget{}, err
	}

	return budget, nil
}

func (r *budgetRepository) GetBudgetByID(ctx context.Context, tx *gorm.DB, id uint) (entities.Budget, error) {
	if tx == nil {
		tx = r.db
	}

	var budget entities.Budget
	if err := tx.WithContext(ctx).Where("id = ?", id).Take(&budget).Error; err != nil {
		return entities.Budget{}, err
	}

	return budget, nil
}

func (r *budgetRepository) UpdateBudget(ctx context.Context, tx *gorm.DB, budget entities.Budget) (entities.Budget, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Updates(&budget).Error; err != nil {
		return entities.Budget{}, err
	}

	return budget, nil
}

func (r *budgetRepository) GetAllBudgets(ctx context.Context, tx *gorm.DB) ([]entities.Budget, error) {
	if tx == nil {
		tx = r.db
	}

	var budgets []entities.Budget
	if err := tx.WithContext(ctx).Find(&budgets).Error; err != nil {
		return nil, err
	}

	return budgets, nil
}

func (r *budgetRepository) GetBudgetActuals(ctx context.Context, tx *gorm.DB, startTime, endTime time.Time) ([]dto.BudgetActualResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var results []dto.BudgetActualResponse

	query := `
		SELECT 
			budgets.id as budget_id, 
			budgets.category_id, 
			COALESCE(SUM(transactions.amount), 0) as amount
		FROM budgets
		LEFT JOIN transactions ON 
			budgets.category_id = transactions.category_id AND 
			transactions.date >= ? AND 
			transactions.date <= ?
		GROUP BY budgets.id, budgets.category_id
	`

	if err := tx.WithContext(ctx).Raw(query, startTime, endTime).Scan(&results).Error; err != nil {
		return nil, err
	}

	return results, nil
}
