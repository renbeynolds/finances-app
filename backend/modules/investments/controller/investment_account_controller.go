package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/investments/dto"
	"github.com/renbeynolds/finances-app/modules/investments/query"
	"github.com/renbeynolds/finances-app/modules/investments/service"
	"github.com/renbeynolds/finances-app/modules/investments/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	InvestmentAccountController interface {
		CreateInvestmentAccount(ctx *gin.Context)
		GetAllInvestmentAccounts(ctx *gin.Context)
		GetInvestmentAccountByID(ctx *gin.Context)
		UpdateInvestmentAccount(ctx *gin.Context)
		GetBalanceOverTime(ctx *gin.Context)
	}

	investmentAccountController struct {
		investmentAccountService    service.InvestmentAccountService
		investmentAccountValidation *validation.InvestmentAccountValidation
		db                          *gorm.DB
	}
)

func NewInvestmentAccountController(injector do.Injector, s service.InvestmentAccountService) InvestmentAccountController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	investmentAccountValidation := validation.NewInvestmentAccountValidation()
	return &investmentAccountController{
		investmentAccountService:    s,
		investmentAccountValidation: investmentAccountValidation,
		db:                          db,
	}
}

func (c *investmentAccountController) CreateInvestmentAccount(ctx *gin.Context) {
	var req dto.CreateInvestmentAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.investmentAccountValidation.ValidateCreateInvestmentAccountRequest(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	investmentAccount, err := c.investmentAccountService.CreateInvestmentAccount(ctx.Request.Context(), req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_INVESTMENT_ACCOUNT, investmentAccount, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *investmentAccountController) GetAllInvestmentAccounts(ctx *gin.Context) {
	investmentAccounts, err := c.investmentAccountService.GetAllInvestmentAccounts(ctx.Request.Context())
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LIST_INVESTMENT_ACCOUNTS, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LIST_INVESTMENT_ACCOUNTS, investmentAccounts, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *investmentAccountController) GetInvestmentAccountByID(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	investmentAccount, err := c.investmentAccountService.GetInvestmentAccountByID(ctx.Request.Context(), byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_INVESTMENT_ACCOUNT, investmentAccount, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *investmentAccountController) UpdateInvestmentAccount(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	var req dto.UpdateInvestmentAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.investmentAccountValidation.ValidateUpdateInvestmentAccountRequest(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	investmentAccount, err := c.investmentAccountService.UpdateInvestmentAccount(ctx.Request.Context(), req, byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_INVESTMENT_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_INVESTMENT_ACCOUNT, investmentAccount, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *investmentAccountController) GetBalanceOverTime(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BALANCE_OVER_TIME, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	var query query.BalanceOverTimeQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BALANCE_OVER_TIME, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	balanceOverTime, err := c.investmentAccountService.GetBalanceOverTime(ctx.Request.Context(), byID.ID, query)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BALANCE_OVER_TIME, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_BALANCE_OVER_TIME, balanceOverTime, nil)
	ctx.JSON(http.StatusOK, res)
}
