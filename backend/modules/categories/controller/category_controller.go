package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/categories/dto"
	"github.com/renbeynolds/finances-app/modules/categories/query"
	"github.com/renbeynolds/finances-app/modules/categories/service"
	"github.com/renbeynolds/finances-app/modules/categories/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	CategoryController interface {
		CreateCategory(ctx *gin.Context)
		GetAllCategories(ctx *gin.Context)
		GetTopSpendingCategories(ctx *gin.Context)
	}

	categoryController struct {
		categoryService    service.CategoryService
		categoryValidation *validation.CategoryValidation
		db                 *gorm.DB
	}
)

func NewCategoryController(injector do.Injector, s service.CategoryService) CategoryController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	categoryValidation := validation.NewCategoryValidation()
	return &categoryController{
		categoryService:    s,
		categoryValidation: categoryValidation,
		db:                 db,
	}
}

func (c *categoryController) CreateCategory(ctx *gin.Context) {
	var req dto.CreateCategoryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_CATEGORY, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.categoryValidation.ValidateCreateCategory(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_CATEGORY, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	category, err := c.categoryService.CreateCategory(ctx.Request.Context(), req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_CATEGORY, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_CATEGORY, category, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *categoryController) GetAllCategories(ctx *gin.Context) {
	categories, err := c.categoryService.GetAllCategories(ctx.Request.Context())
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LIST_CATEGORIES, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LIST_CATEGORIES, categories, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *categoryController) GetTopSpendingCategories(ctx *gin.Context) {
	var query query.TopSpendingCategoriesQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LIST_TOP_SPENDING_CATEGORIES, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	topSpendingCategories, err := c.categoryService.GetTopSpendingCategories(ctx.Request.Context(), query)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LIST_TOP_SPENDING_CATEGORIES, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LIST_TOP_SPENDING_CATEGORIES, topSpendingCategories, nil)
	ctx.JSON(http.StatusOK, res)
}
