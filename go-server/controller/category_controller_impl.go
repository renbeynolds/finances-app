package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/service"
)

type CategoryControllerImpl struct {
	categoryService service.CategoryService
	validate        *validator.Validate
}

func NewCategoryControllerImpl(service service.CategoryService, validate *validator.Validate) CategoryController {
	return &CategoryControllerImpl{
		categoryService: service,
		validate:        validate,
	}
}

func (controller *CategoryControllerImpl) FindAll(ctx *gin.Context) {
	foundCategories := controller.categoryService.FindAll()
	response.SendStatusOK(foundCategories, nil, ctx)
}
