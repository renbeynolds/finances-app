package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/gorm"
)

type (
	CategoryRepository interface {
		CreateCategory(ctx context.Context, tx *gorm.DB, category entities.Category) (entities.Category, error)
		GetAllCategories(ctx context.Context, tx *gorm.DB) ([]entities.Category, error)
	}

	categoryRepository struct {
		db *gorm.DB
	}
)

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{
		db: db,
	}
}

func (r *categoryRepository) CreateCategory(ctx context.Context, tx *gorm.DB, category entities.Category) (entities.Category, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Create(&category).Error; err != nil {
		return entities.Category{}, err
	}

	return category, nil
}

func (r *categoryRepository) GetAllCategories(ctx context.Context, tx *gorm.DB) ([]entities.Category, error) {
	if tx == nil {
		tx = r.db
	}

	var categories []entities.Category
	if err := tx.WithContext(ctx).Find(&categories).Error; err != nil {
		return nil, err
	}

	return categories, nil
}
