package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"gorm.io/gorm"
)

type CategoryRepositoryImpl struct {
	Db *gorm.DB
}

func NewCategoryRepositoryImpl(Db *gorm.DB) CategoryRepository {
	return &CategoryRepositoryImpl{Db: Db}
}

func (r *CategoryRepositoryImpl) FindAll() []model.Category {
	var categories []model.Category
	r.Db.Find(&categories)
	return categories
}
