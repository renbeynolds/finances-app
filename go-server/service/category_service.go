package service

import (
	"github.com/renbeynolds/finances-app/data/response"
)

type CategoryService interface {
	FindAll() []response.CategoryResponse
}
