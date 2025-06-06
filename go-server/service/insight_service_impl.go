package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/util/filter"
)

type InsightServiceImpl struct {
	InsightRepository repository.InsightRepository
	Validate          *validator.Validate
}

func NewInsightServiceImpl(insightRepository repository.InsightRepository) InsightService {
	return &InsightServiceImpl{
		InsightRepository: insightRepository,
	}
}

func (t *InsightServiceImpl) GetTopSpendingCategories(filters *filter.TransactionFilters) []response.TopSpendingCategoryResponse {
	return t.InsightRepository.GetTopSpendingCategories(filters)
}

func (t *InsightServiceImpl) GetAmountVsAverage(amountType, from, to, avgFrom, avgTo string) response.AmountVsAverageResponse {
	return t.InsightRepository.GetAmountVsAverage(amountType, from, to, avgFrom, avgTo)
}

func (t *InsightServiceImpl) GetIncomeVsExpense(from, to string) []response.IncomeVsExpenseResponse {
	return t.InsightRepository.GetIncomeVsExpense(from, to)
}

func (t *InsightServiceImpl) GetNetWorth(from, to string) []response.AmountOverTimeResponse {
	return t.InsightRepository.GetNetWorth(from, to)
}
