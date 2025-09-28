package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/banking/dto"
	"github.com/renbeynolds/finances-app/modules/banking/service"
	"github.com/renbeynolds/finances-app/modules/banking/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	BankAccountController interface {
		GetAllBankAccounts(ctx *gin.Context)
		GetBankAccountByID(ctx *gin.Context)
		UpdateBankAccount(ctx *gin.Context)
	}

	bankAccountController struct {
		bankAccountService    service.BankAccountService
		bankAccountValidation *validation.BankAccountValidation
		db                    *gorm.DB
	}
)

func NewBankAccountController(injector do.Injector, s service.BankAccountService) BankAccountController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	bankAccountValidation := validation.NewBankAccountValidation()
	return &bankAccountController{
		bankAccountService:    s,
		bankAccountValidation: bankAccountValidation,
		db:                    db,
	}
}

func (c *bankAccountController) GetAllBankAccounts(ctx *gin.Context) {
	bankAccounts, err := c.bankAccountService.GetAllBankAccounts(ctx.Request.Context())
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LIST_BANK_ACCOUNTS, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LIST_BANK_ACCOUNTS, bankAccounts)
	ctx.JSON(http.StatusOK, res)
}

func (c *bankAccountController) GetBankAccountByID(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BANK_ACCOUNT, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	bankAccount, err := c.bankAccountService.GetBankAccountByID(ctx.Request.Context(), byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BANK_ACCOUNT, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_BANK_ACCOUNT, bankAccount)
	ctx.JSON(http.StatusOK, res)
}

func (c *bankAccountController) UpdateBankAccount(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	var req dto.UpdateBankAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.bankAccountValidation.ValidateUpdateBankAccountRequest(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	bankAccount, err := c.bankAccountService.UpdateBankAccount(ctx.Request.Context(), req, byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_BANK_ACCOUNT, bankAccount)
	ctx.JSON(http.StatusOK, res)
}
