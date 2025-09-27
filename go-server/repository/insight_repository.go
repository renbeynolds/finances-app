package repository

import (
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/util/filter"
)

type InsightRepository interface {
	GetTopSpendingCategories(filters *filter.TransactionFilters) []response.TopSpendingCategoryResponse
	GetAmountVsAverage(amountType, from, to, avgFrom, avgTo string) response.AmountVsAverageResponse
	GetIncomeVsExpense(from, to string) []response.IncomeVsExpenseResponse
	GetNetWorth(from, to string) []response.AmountOverTimeResponse
	GetCategoryOverTime(from, to string, categoryId int) []response.AmountOverTimeResponse
	GetCategoriesOverTime(from, to string) []response.CategoriesOverTimeResponse
}
