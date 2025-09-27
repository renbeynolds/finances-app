package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type CategoryRepository interface {
	Insert(category model.Category) model.Category
	FindAll() []model.Category
}
