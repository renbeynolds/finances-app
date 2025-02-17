package controller

import (
	"github.com/gin-gonic/gin"
)

type InsightController interface {
	GetTopSpendingCategories(ctx *gin.Context)
	GetIncomeVsAverage(ctx *gin.Context)
}
