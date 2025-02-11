package service

import (
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/util/filter"
)

type InsightService interface {
	GetTopSpendingCategories(dateFilter *filter.DateFilter) []response.TopSpendingCategoryResponse
}
