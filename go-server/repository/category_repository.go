package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type CategoryRepository interface {
	FindAll() []model.Category
}
