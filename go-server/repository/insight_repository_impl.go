package repository

import (
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/util/filter"
	"gorm.io/gorm"
)

type InsightRepositoryImpl struct {
	Db *gorm.DB
}

func NewInsightRepositoryImpl(Db *gorm.DB) InsightRepository {
	return &InsightRepositoryImpl{Db: Db}
}

func (r *InsightRepositoryImpl) GetTopSpendingCategories(dateFilter *filter.DateFilter) []response.TopSpendingCategoryResponse {

	const numCategories = 10

	var result []response.TopSpendingCategoryResponse

	r.Db.Raw(`
    WITH category_totals AS (
      SELECT
        SUM(trans.amount) AS data,
        COALESCE(c.parent_category_id, c.id) AS categoryid
      FROM
        transactions trans
        LEFT JOIN categories c on trans.category_id = c.id
      WHERE
        c.type = 'expense' AND
        trans.date >= ? AND trans.date <= ?
      GROUP BY COALESCE(c.parent_category_id, c.id)
      HAVING COALESCE(c.parent_category_id, c.id) IS NOT NULL
    )
    SELECT name, categoryid AS id, -1 * data AS value, color FROM (
      WITH category_ranks AS (
        SELECT
          categoryid,
          data,
          row_number() OVER (ORDER BY data ASC, categoryid) AS rn
        FROM category_totals
      )
      (
        SELECT
          categoryid,
          category.name AS name,
          category.color AS color,
          data
        FROM
          category_ranks
          LEFT JOIN categories category ON category.id = category_ranks.categoryid
        WHERE rn <= ?
        ORDER BY rn
      )
      UNION ALL
      SELECT NULL, 'OTHER', NULL, SUM(data)
      FROM category_ranks
      WHERE rn > ?
      HAVING COUNT(*) > 0
    ) ranking
	`, dateFilter.From, dateFilter.To, numCategories, numCategories).Scan(&result)

	return result
}
