package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/service"
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
	pagination := paginate.Pagination{
		Page:  ctx.GetInt("page"),
		Limit: ctx.GetInt("limit"),
	}
	foundCategories := controller.transactionService.FindAll(&pagination)
	fmt.Println(pagination.TotalPages)
	response.SendStatusOK(foundCategories, &pagination, ctx)
}
