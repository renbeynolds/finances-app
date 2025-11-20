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
		UpdateCategory(ctx *gin.Context)
		GetTopSpendingCategories(ctx *gin.Context)
		GetCategoryAmountOverTime(ctx *gin.Context)
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

func (c *categoryController) UpdateCategory(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_CATEGORY, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	var req dto.UpdateCategoryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_CATEGORY, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.categoryValidation.ValidateUpdateCategory(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_CATEGORY, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	category, err := c.categoryService.UpdateCategory(ctx.Request.Context(), req, byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_CATEGORY, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_CATEGORY, category, nil)
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

func (c *categoryController) GetCategoryAmountOverTime(ctx *gin.Context) {
	categoryID := ctx.Param("id")
	var query query.CategoryAmountOverTimeQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_CATEGORY_AMOUNT_OVER_TIME, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	amountOverTime, err := c.categoryService.GetCategoryAmountOverTime(ctx.Request.Context(), categoryID, query)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_CATEGORY_AMOUNT_OVER_TIME, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_CATEGORY_AMOUNT_OVER_TIME, amountOverTime, nil)
	ctx.JSON(http.StatusOK, res)
}
