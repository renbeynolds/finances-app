package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/budgets/dto"
	"github.com/renbeynolds/finances-app/modules/budgets/service"
	"github.com/renbeynolds/finances-app/modules/budgets/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	BudgetController interface {
		CreateBudget(ctx *gin.Context)
		GetBudgetByID(ctx *gin.Context)
		GetAllBudgets(ctx *gin.Context)
		UpdateBudget(ctx *gin.Context)
	}

	budgetController struct {
		budgetService    service.BudgetService
		budgetValidation *validation.BudgetValidation
		db               *gorm.DB
	}
)

func NewBudgetController(injector do.Injector, s service.BudgetService) BudgetController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	budgetValidation := validation.NewBudgetValidation()
	return &budgetController{
		budgetService:    s,
		budgetValidation: budgetValidation,
		db:               db,
	}
}

func (c *budgetController) CreateBudget(ctx *gin.Context) {
	var req dto.CreateBudgetRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.budgetValidation.ValidateCreateBudget(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	budget, err := c.budgetService.CreateBudget(ctx.Request.Context(), req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_BUDGET, budget, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *budgetController) GetBudgetByID(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	budget, err := c.budgetService.GetBudgetByID(ctx.Request.Context(), byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BUDGET, err.Error())
		ctx.JSON(http.StatusNotFound, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_BUDGET, budget, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *budgetController) GetAllBudgets(ctx *gin.Context) {
	budgets, err := c.budgetService.GetAllBudgets(ctx.Request.Context())
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_ALL_BUDGETS, err.Error())
		ctx.JSON(http.StatusInternalServerError, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_ALL_BUDGETS, budgets, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *budgetController) UpdateBudget(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	var req dto.UpdateBudgetRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.budgetValidation.ValidateUpdateBudget(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	budget, err := c.budgetService.UpdateBudget(ctx.Request.Context(), req, byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BUDGET, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_BUDGET, budget, nil)
	ctx.JSON(http.StatusOK, res)
}
