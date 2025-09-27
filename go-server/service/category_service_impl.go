package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/model"
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

func (t *CategoryServiceImpl) Create(category request.CreateCategoryRequest) response.CategoryResponse {
	categoryModel := model.Category{
		Name:             category.Name,
		Color:            &category.Color,
		IconURL:          category.IconURL,
		Type:             category.Type,
		ParentCategoryID: category.ParentID,
	}

	categoryModel = t.CategoryRepository.Insert(categoryModel)
	response := response.CategoryResponse{
		Id:   int(categoryModel.ID),
		Name: categoryModel.Name,
		Type: categoryModel.Type,
	}
	if categoryModel.Color != nil {
		response.Color = *categoryModel.Color
	}
	if categoryModel.IconURL != nil {
		response.IconURL = *categoryModel.IconURL
	}
	if categoryModel.ParentCategoryID != nil {
		parentId := int(*categoryModel.ParentCategoryID)
		response.ParentCategory = &parentId
	}

	return response
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
