package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util"
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
	r.Db.Preload("PrefixRules").Find(&categories)
	return categories
}

func (r *CategoryRepositoryImpl) Insert(category model.Category) model.Category {
	result := r.Db.Create(&category)
	util.ErrorPanic(result.Error)
	return category
}
