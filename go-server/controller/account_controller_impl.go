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
