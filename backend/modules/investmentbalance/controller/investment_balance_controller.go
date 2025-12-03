package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/dto"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/service"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"
	"gorm.io/gorm"
)

type (
	InvestmentBalanceController interface {
		CreateInvestmentBalance(ctx *gin.Context)
	}

	investmentBalanceController struct {
		investmentBalanceService    service.InvestmentBalanceService
		investmentBalanceValidation *validation.InvestmentBalanceValidation
		db                          *gorm.DB
	}
)

func NewInvestmentBalanceController(injector do.Injector, s service.InvestmentBalanceService) InvestmentBalanceController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	investmentBalanceValidation := validation.NewInvestmentBalanceValidation()
	return &investmentBalanceController{
		investmentBalanceService:    s,
		investmentBalanceValidation: investmentBalanceValidation,
		db:                          db,
	}
}

func (c *investmentBalanceController) CreateInvestmentBalance(ctx *gin.Context) {
	var req dto.CreateInvestmentBalanceRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_INVESTMENT_BALANCE, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.investmentBalanceValidation.ValidateCreateInvestmentBalanceRequest(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_INVESTMENT_BALANCE, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	investmentBalance, err := c.investmentBalanceService.CreateInvestmentBalance(ctx.Request.Context(), req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_INVESTMENT_BALANCE, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_INVESTMENT_BALANCE, investmentBalance, nil)
	ctx.JSON(http.StatusOK, res)
}
