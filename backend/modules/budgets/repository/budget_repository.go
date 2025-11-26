package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/gorm"
)

type (
	BudgetRepository interface {
		CreateBudget(ctx context.Context, tx *gorm.DB, budget entities.Budget) (entities.Budget, error)
		GetBudgetByID(ctx context.Context, tx *gorm.DB, id uint) (entities.Budget, error)
		UpdateBudget(ctx context.Context, tx *gorm.DB, budget entities.Budget) (entities.Budget, error)
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
