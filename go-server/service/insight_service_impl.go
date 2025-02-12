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
	return t.InsightRepository.GetTopSpendingCategories(dateFilter)
}
