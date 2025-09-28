package controller

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/data/validation"
	"github.com/renbeynolds/finances-app/service"
	"github.com/renbeynolds/finances-app/util"
)

type InvestmentAccountControllerImpl struct {
	investmentAccountService service.InvestmentAccountService
	validate                 *validator.Validate
}

func NewInvestmentAccountControllerImpl(service service.InvestmentAccountService, validate *validator.Validate) InvestmentAccountController {
	return &InvestmentAccountControllerImpl{
		investmentAccountService: service,
		validate:                 validate,
	}
}

func (controller *InvestmentAccountControllerImpl) Create(ctx *gin.Context) {
	createAccountRequest := request.CreateInvestmentAccountRequest{}
	err := ctx.ShouldBindJSON(&createAccountRequest)
	util.ErrorPanic(err)

	if !validation.Validate(
		controller.validate,
		createAccountRequest,
		validation.CreateInvestmentAccountRequestValidationMessageBuilder,
		ctx,
	) {
		return
	}

	newAccount := controller.investmentAccountService.Create(createAccountRequest)
	response.SendStatusOK(newAccount, nil, ctx)
}

func (controller *InvestmentAccountControllerImpl) FindAll(ctx *gin.Context) {
	foundAccounts := controller.investmentAccountService.FindAll()
	response.SendStatusOK(foundAccounts, nil, ctx)
}

func (controller *InvestmentAccountControllerImpl) FindByID(ctx *gin.Context) {
	accountId := ctx.Param("accountId")
	id, err := strconv.Atoi(accountId)
	util.ErrorPanic(err)
	foundAccount := controller.investmentAccountService.FindByID(uint(id))
	response.SendStatusOK(foundAccount, nil, ctx)
}

func (controller *InvestmentAccountControllerImpl) RecordBalance(ctx *gin.Context) {
	accountId := ctx.Param("accountId")
	id, err := strconv.Atoi(accountId)
	util.ErrorPanic(err)

	recordBalanceRequest := request.RecordInvestmentAccountBalanceRequest{}
	err = ctx.ShouldBindJSON(&recordBalanceRequest)
	util.ErrorPanic(err)

	account := controller.investmentAccountService.RecordBalance(uint(id), recordBalanceRequest)
	response.SendStatusOK(account, nil, ctx)
}
