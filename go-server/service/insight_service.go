package service

import (
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/util/filter"
)

type InsightService interface {
	GetTopSpendingCategories(filters *filter.TransactionFilters) []response.TopSpendingCategoryResponse
	GetAmountVsAverage(amountType, from, to, avgFrom, avgTo string) response.AmountVsAverageResponse
	GetIncomeVsExpense(from, to string) []response.IncomeVsExpenseResponse
}
