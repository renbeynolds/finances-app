package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/data/validation"
	"github.com/renbeynolds/finances-app/service"
	"github.com/renbeynolds/finances-app/util"
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

func (controller *CategoryControllerImpl) Create(ctx *gin.Context) {
	createCategoryRequest := request.CreateCategoryRequest{}
	err := ctx.ShouldBindJSON(&createCategoryRequest)
	util.ErrorPanic(err)

	if !validation.Validate(
		controller.validate,
		createCategoryRequest,
		validation.CreateCategoryRequestValidationMessageBuilder,
		ctx,
	) {
		return
	}

	newCategory := controller.categoryService.Create(createCategoryRequest)
	response.SendStatusOK(newCategory, nil, ctx)
}

func (controller *CategoryControllerImpl) FindAll(ctx *gin.Context) {
	foundCategories := controller.categoryService.FindAll()
	response.SendStatusOK(foundCategories, nil, ctx)
}
