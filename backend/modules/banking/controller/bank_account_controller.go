package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/banking/dto"
	"github.com/renbeynolds/finances-app/modules/banking/query"
	"github.com/renbeynolds/finances-app/modules/banking/service"
	"github.com/renbeynolds/finances-app/modules/banking/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	BankAccountController interface {
		CreateBankAccount(ctx *gin.Context)
		GetAllBankAccounts(ctx *gin.Context)
		GetBankAccountByID(ctx *gin.Context)
		UpdateBankAccount(ctx *gin.Context)
		ArchiveBankAccount(ctx *gin.Context)
		GetBalanceOverTime(ctx *gin.Context)
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

func (c *bankAccountController) CreateBankAccount(ctx *gin.Context) {
	var req dto.CreateBankAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.bankAccountValidation.ValidateCreateBankAccountRequest(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	bankAccount, err := c.bankAccountService.CreateBankAccount(ctx.Request.Context(), req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_BANK_ACCOUNT, bankAccount, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *bankAccountController) GetAllBankAccounts(ctx *gin.Context) {
	bankAccounts, err := c.bankAccountService.GetAllBankAccounts(ctx.Request.Context())
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LIST_BANK_ACCOUNTS, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LIST_BANK_ACCOUNTS, bankAccounts, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *bankAccountController) GetBankAccountByID(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	bankAccount, err := c.bankAccountService.GetBankAccountByID(ctx.Request.Context(), byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_BANK_ACCOUNT, bankAccount, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *bankAccountController) UpdateBankAccount(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	var req dto.UpdateBankAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.bankAccountValidation.ValidateUpdateBankAccountRequest(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	bankAccount, err := c.bankAccountService.UpdateBankAccount(ctx.Request.Context(), req, byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_BANK_ACCOUNT, bankAccount, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *bankAccountController) ArchiveBankAccount(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_ARCHIVE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	err := c.bankAccountService.ArchiveBankAccount(ctx.Request.Context(), byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_ARCHIVE_BANK_ACCOUNT, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_ARCHIVE_BANK_ACCOUNT, map[string]interface{}{}, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *bankAccountController) GetBalanceOverTime(ctx *gin.Context) {
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

	balanceOverTime, err := c.bankAccountService.GetBalanceOverTime(ctx.Request.Context(), byID.ID, query)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_BALANCE_OVER_TIME, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_BALANCE_OVER_TIME, balanceOverTime, nil)
	ctx.JSON(http.StatusOK, res)
}
