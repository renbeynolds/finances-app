package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/service"
	"github.com/renbeynolds/finances-app/util/filter"
)

type InsightControllerImpl struct {
	insightService service.InsightService
	validate       *validator.Validate
}

func NewInsightControllerImpl(service service.InsightService, validate *validator.Validate) InsightController {
	return &InsightControllerImpl{
		insightService: service,
		validate:       validate,
	}
}

func (controller *InsightControllerImpl) GetTopSpendingCategories(ctx *gin.Context) {
	filters := filter.TransactionFilters{
		From: ctx.Query("from"),
		To:   ctx.Query("to"),
	}

	topSpendingCategories := controller.insightService.GetTopSpendingCategories(&filters)
	response.SendStatusOK(topSpendingCategories, nil, ctx)
}

func (controller *InsightControllerImpl) GetIncomeVsAverage(ctx *gin.Context) {
	resp := controller.insightService.GetAmountVsAverage("income", ctx.Query("from"), ctx.Query("to"), ctx.Query("avg_from"), ctx.Query("avg_to"))
	response.SendStatusOK(resp, nil, ctx)
}

func (controller *InsightControllerImpl) GetExpenseVsAverage(ctx *gin.Context) {
	resp := controller.insightService.GetAmountVsAverage("expense", ctx.Query("from"), ctx.Query("to"), ctx.Query("avg_from"), ctx.Query("avg_to"))
	response.SendStatusOK(resp, nil, ctx)
}

func (controller *InsightControllerImpl) GetIncomeVsExpense(ctx *gin.Context) {
	incomeVsExpense := controller.insightService.GetIncomeVsExpense(ctx.Query("from"), ctx.Query("to"))
	response.SendStatusOK(incomeVsExpense, nil, ctx)
}

func (controller *InsightControllerImpl) GetNetWorth(ctx *gin.Context) {
	netWorth := controller.insightService.GetNetWorth(ctx.Query("from"), ctx.Query("to"))
	response.SendStatusOK(netWorth, nil, ctx)
}
