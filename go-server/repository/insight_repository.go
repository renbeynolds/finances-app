package repository

import (
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/util/filter"
)

type InsightRepository interface {
	GetTopSpendingCategories(dateFilter *filter.DateFilter) []response.TopSpendingCategoryResponse
}
