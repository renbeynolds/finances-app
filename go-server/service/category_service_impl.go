package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/repository"
)

type CategoryServiceImpl struct {
	CategoryRepository repository.CategoryRepository
	Validate           *validator.Validate
}

func NewCategoryServiceImpl(categoryRepository repository.CategoryRepository) CategoryService {
	return &CategoryServiceImpl{
		CategoryRepository: categoryRepository,
	}
}

func (t *CategoryServiceImpl) FindAll() []response.CategoryResponse {
	result := t.CategoryRepository.FindAll()

	categories := []response.CategoryResponse{}
	for _, value := range result {
		category := response.CategoryResponse{
			Id:   int(value.ID),
			Name: value.Name,
			Type: value.Type,
		}
		if value.Color != nil {
			category.Color = *value.Color
		}
		if value.IconURL != nil {
			category.IconURL = *value.IconURL
		}
		if value.ParentCategoryID != nil {
			parentId := int(*value.ParentCategoryID)
			category.ParentCategory = &parentId
		}
		categories = append(categories, category)
	}

	return categories
}
