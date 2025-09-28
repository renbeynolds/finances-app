package service

import (
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
)

type CategoryService interface {
	Create(category request.CreateCategoryRequest) response.CategoryResponse
	FindAll() []response.CategoryResponse
}
