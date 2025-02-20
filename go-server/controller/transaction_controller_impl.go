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
	"github.com/renbeynolds/finances-app/util/filter"
	"github.com/renbeynolds/finances-app/util/paginate"
)

type TransactionControllerImpl struct {
	transactionService service.TransactionService
	validate           *validator.Validate
}

func NewTransactionControllerImpl(service service.TransactionService, validate *validator.Validate) TransactionController {
	return &TransactionControllerImpl{
		transactionService: service,
		validate:           validate,
	}
}

func (controller *TransactionControllerImpl) FindAll(ctx *gin.Context) {
	filters := filter.TransactionFilters{
		From:        ctx.Query("from"),
		To:          ctx.Query("to"),
		Description: ctx.Query("description"),
	}

	pagination := paginate.Pagination{
		Page:  ctx.GetInt("page"),
		Limit: ctx.GetInt("limit"),
	}

	foundTransactions := controller.transactionService.FindAll(&pagination, &filters)
	response.SendStatusOK(foundTransactions, &pagination, ctx)
}

func (controller *TransactionControllerImpl) Update(ctx *gin.Context) {
	updateTransactionRequest := request.UpdateTransactionRequest{}
	err := ctx.ShouldBindJSON(&updateTransactionRequest)
	util.ErrorPanic(err)

	if !validation.Validate(
		controller.validate,
		updateTransactionRequest,
		validation.UpdateTransactionRequestValidationMessageBuilder,
		ctx,
	) {
		return
	}

	transactionId := ctx.Param("transactionId")
	id, err := strconv.Atoi(transactionId)
	util.ErrorPanic(err)

	updateTransactionRequest.ID = uint(id)

	updatedTransaction := controller.transactionService.Update(updateTransactionRequest)
	response.SendStatusOK(updatedTransaction, nil, ctx)
}
