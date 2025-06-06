package controller

import (
	"github.com/gin-gonic/gin"
)

type InsightController interface {
	GetTopSpendingCategories(ctx *gin.Context)
	GetIncomeVsAverage(ctx *gin.Context)
	GetExpenseVsAverage(ctx *gin.Context)
	GetIncomeVsExpense(ctx *gin.Context)
	GetNetWorth(ctx *gin.Context)
}
