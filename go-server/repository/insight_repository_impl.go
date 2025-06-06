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

	if result == nil {
		result = []response.TopSpendingCategoryResponse{}
	}

	return result
}

func (r *InsightRepositoryImpl) GetAmountVsAverage(amountType, from, to, avgFrom, avgTo string) response.AmountVsAverageResponse {
	var amount int64
	var average int64

	r.Db.Raw(`
		SELECT COALESCE(ABS(SUM(t.amount)), 0) as amount
		FROM transactions t
		LEFT JOIN categories c ON t.category_id = c.id
		WHERE
			c.type = ? AND
			t.date >= ? AND t.date <= ?
	`, amountType, from, to).Scan(&amount)

	r.Db.Raw(`
	  WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series(?, ?, '1 month'::interval) bucket
    )
    SELECT
      COALESCE(TRUNC(ABS(AVG(sums.total))), 0) as average
    FROM (
      SELECT
        SUM(amount) AS "total"
      FROM calendar c
      LEFT JOIN transactions t ON DATE_TRUNC('month', t.date) = c.month
      LEFT JOIN categories cat ON t.category_id = cat.id
      WHERE cat.type = ?
      GROUP BY c.month
    ) sums
	`, avgFrom, avgTo, amountType).Scan(&average)

	return response.AmountVsAverageResponse{
		Amount:  amount,
		Average: average,
	}
}

func (r *InsightRepositoryImpl) GetIncomeVsExpense(from, to string) []response.IncomeVsExpenseResponse {
	var result []response.IncomeVsExpenseResponse

	r.Db.Raw(`
		WITH calendar AS (
			SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series(?, ?, '1 month'::interval) bucket
		)
		SELECT
			COALESCE(SUM(CASE WHEN cat.type = 'income' THEN t.amount ELSE 0 END), 0) as income,
			COALESCE(SUM(CASE WHEN cat.type = 'expense' THEN t.amount ELSE 0 END), 0) as expense,
			COALESCE(SUM(t.amount), 0) as net,
			TO_CHAR(c.month, 'YYYY-MM') as month
		FROM calendar c
		LEFT JOIN transactions t ON DATE_TRUNC('month', t.date) = c.month
		LEFT JOIN categories cat ON t.category_id = cat.id
    WHERE cat.type IN ('income', 'expense')
		GROUP BY c.month
		ORDER BY c.month ASC
	`, from, to).Scan(&result)

	return result
}

// May 7th net worth should be 680490.75
func (r *InsightRepositoryImpl) GetNetWorth(from, to string) []response.AmountOverTimeResponse {
	var result []response.AmountOverTimeResponse

	r.Db.Raw(`
		WITH calendar AS (
			SELECT DATE_TRUNC('day', bucket::date) AS day FROM generate_series(?, ?, '1 day'::interval) bucket
		),
		latest_account_balances AS (
			SELECT
				c.day,
				a.id AS account_id,
				COALESCE((
					SELECT t.balance
					FROM transactions t
          LEFT JOIN uploads u ON t.upload_id = u.id
					WHERE u.account_id = a.id AND t.date <= c.day
					ORDER BY t.date DESC, t.id DESC
					LIMIT 1
				), a.balance) AS balance
			FROM calendar c
			CROSS JOIN accounts a
		),
		latest_investment_balances AS (
			SELECT
				c.day,
				ia.id AS investment_account_id,
				(
					SELECT iab.balance
					FROM investment_account_balances iab
					WHERE iab.investment_account_id = ia.id AND iab.date <= c.day
					ORDER BY iab.date DESC, iab.id DESC
					LIMIT 1
				) AS balance
			FROM calendar c
			CROSS JOIN investment_accounts ia
		),
		daily_totals AS (
			SELECT
				c.day,
				COALESCE(SUM(lab.balance), 0) AS account_balance,
				COALESCE(SUM(lib.balance), 0) AS investment_balance
			FROM calendar c
			LEFT JOIN (
				SELECT day, SUM(balance) as balance
				FROM latest_account_balances
				GROUP BY day
			) lab ON c.day = lab.day
			LEFT JOIN (
				SELECT day, SUM(balance) as balance
				FROM latest_investment_balances
				GROUP BY day
			) lib ON c.day = lib.day
			GROUP BY c.day
		)
		SELECT
			(account_balance + investment_balance) AS amount,
			TO_CHAR(day, 'YYYY-MM-DD') AS date
		FROM daily_totals
		ORDER BY day ASC
	`, from, to).Scan(&result)

	return result
}
