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

func (r *InsightRepositoryImpl) GetTopSpendingCategories(filters *filter.TransactionFilters) []response.TopSpendingCategoryResponse {

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
	`, filters.From, filters.To, numCategories, numCategories).Scan(&result)

	return result
}

func (r *InsightRepositoryImpl) GetIncomeVsAverage(from, to, avgFrom, avgTo string) response.AmountVsAverageResponse {
	var amount int64
	var average int64

	r.Db.Raw(`
		SELECT COALESCE(SUM(t.amount), 0) as amount
		FROM transactions t
		LEFT JOIN categories c ON t.category_id = c.id
		WHERE
			c.type = 'income' AND
			t.date >= ? AND t.date <= ?
	`, from, to).Scan(&amount)

	r.Db.Raw(`
	  WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series(?, ?, '1 month'::interval) bucket
    )
    SELECT
      TRUNC(AVG(sums.total)) as average
    FROM (
      SELECT
        SUM(amount) AS "total"
      FROM calendar c
      LEFT JOIN transactions t ON DATE_TRUNC('month', t.date) = c.month
      LEFT JOIN categories cat ON t.category_id = cat.id
      WHERE cat.type = 'income'
      GROUP BY c.month
    ) sums
	`, avgFrom, avgTo).Scan(&average)

	return response.AmountVsAverageResponse{
		Amount:  amount,
		Average: average,
	}
}
