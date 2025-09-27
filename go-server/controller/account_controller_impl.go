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

type AccountControllerImpl struct {
	accountService service.AccountService
	validate       *validator.Validate
}

func NewAccountControllerImpl(service service.AccountService, validate *validator.Validate) AccountController {
	return &AccountControllerImpl{
		accountService: service,
		validate:       validate,
	}
}

func (controller *AccountControllerImpl) Create(ctx *gin.Context) {
	createAccountRequest := request.CreateAccountRequest{}
	err := ctx.ShouldBindJSON(&createAccountRequest)
	util.ErrorPanic(err)

	if !validation.Validate(
		controller.validate,
		createAccountRequest,
		validation.CreateAccountRequestValidationMessageBuilder,
		ctx,
	) {
		return
	}

	newAccount := controller.accountService.Create(createAccountRequest)
	response.SendStatusOK(newAccount, nil, ctx)
}

func (controller *AccountControllerImpl) FindAll(ctx *gin.Context) {
	foundAccounts := controller.accountService.FindAll()
	response.SendStatusOK(foundAccounts, nil, ctx)
}

func (controller *AccountControllerImpl) FindByID(ctx *gin.Context) {
	accountId := ctx.Param("accountId")
	id, err := strconv.Atoi(accountId)
	util.ErrorPanic(err)
	foundAccount := controller.accountService.FindByID(uint(id))
	response.SendStatusOK(foundAccount, nil, ctx)
}

func (controller *AccountControllerImpl) GetBalanceOverTime(ctx *gin.Context) {
	accountId := ctx.Param("accountId")
	from := ctx.Query("from")
	to := ctx.Query("to")
	id, err := strconv.Atoi(accountId)
	util.ErrorPanic(err)
	balanceOverTime := controller.accountService.GetBalanceOverTime(uint(id), from, to)
	response.SendStatusOK(balanceOverTime, nil, ctx)
}

func (controller *AccountControllerImpl) Update(ctx *gin.Context) {
	updateAccountRequest := request.UpdateAccountRequest{}
	err := ctx.ShouldBindJSON(&updateAccountRequest)
	util.ErrorPanic(err)

	if !validation.Validate(
		controller.validate,
		updateAccountRequest,
		validation.UpdateAccountRequestValidationMessageBuilder,
		ctx,
	) {
		return
	}

	accountId := ctx.Param("accountId")
	id, err := strconv.Atoi(accountId)
	util.ErrorPanic(err)

	updateAccountRequest.ID = uint(id)
	updatedAccount := controller.accountService.Update(updateAccountRequest)
	response.SendStatusOK(updatedAccount, nil, ctx)
}
