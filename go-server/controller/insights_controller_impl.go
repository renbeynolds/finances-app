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
