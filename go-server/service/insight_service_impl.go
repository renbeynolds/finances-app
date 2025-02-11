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

func (t *InsightServiceImpl) GetTopSpendingCategories(dateFilter *filter.DateFilter) []response.TopSpendingCategoryResponse {
	t.InsightRepository.GetTopSpendingCategories(dateFilter)
	return []response.TopSpendingCategoryResponse{
		{
			Id:   1,
			Name: "Groceries",
		},
		{
			Id:   2,
			Name: "Restaurants",
		},
		{
			Id:   3,
			Name: "Gas",
		},
		{
			Id:   4,
			Name: "Rent",
		},
		{
			Id:   5,
			Name: "Utilities",
		},
	}
}
