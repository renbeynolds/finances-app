package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/transactions/dto"
	"github.com/renbeynolds/finances-app/modules/transactions/service"
	"github.com/renbeynolds/finances-app/modules/transactions/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	TransactionController interface {
		UpdateTransaction(ctx *gin.Context)
	}

	transactionController struct {
		transactionService    service.TransactionService
		transactionValidation *validation.TransactionValidation
		db                    *gorm.DB
	}
)

func NewTransactionController(injector do.Injector, s service.TransactionService) TransactionController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	transactionValidation := validation.NewTransactionValidation()
	return &transactionController{
		transactionService:    s,
		transactionValidation: transactionValidation,
		db:                    db,
	}
}

func (c *transactionController) UpdateTransaction(ctx *gin.Context) {
	var byID utils.ByID
	if err := ctx.ShouldBindUri(&byID); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_TRANSACTION, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	var req dto.UpdateTransactionRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_TRANSACTION, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.transactionValidation.ValidateUpdateTransaction(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_TRANSACTION, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	transaction, err := c.transactionService.UpdateTransaction(ctx.Request.Context(), req, byID.ID)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_TRANSACTION, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_TRANSACTION, transaction)
	ctx.JSON(http.StatusOK, res)
}
