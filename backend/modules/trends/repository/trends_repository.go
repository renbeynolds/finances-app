package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/modules/trends/dto"
	"gorm.io/gorm"
)

type (
	TrendsRepository interface {
		GetIncomeVsExpense(ctx context.Context, tx *gorm.DB, from string, to string) ([]dto.IncomeVsExpenseResponse, error)
		GetNetWorthOverTime(ctx context.Context, tx *gorm.DB, from string, to string) ([]dto.NetWorthOverTimeResponse, error)
		GetCurrentNetWorth(ctx context.Context, tx *gorm.DB) (*dto.CurrentNetWorthResponse, error)
		GetExpensesOverTime(ctx context.Context, tx *gorm.DB, from string, to string) ([]dto.ExpensesOverTimeResponse, error)
	}

	trendsRepository struct {
		db *gorm.DB
	}
)

func NewTrendsRepository(db *gorm.DB) TrendsRepository {
	return &trendsRepository{
		db: db,
	}
}

func (r *trendsRepository) GetIncomeVsExpense(ctx context.Context, tx *gorm.DB, from string, to string) ([]dto.IncomeVsExpenseResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var result []dto.IncomeVsExpenseResponse

	tx.Raw(`
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

	return result, nil
}

func (r *trendsRepository) GetNetWorthOverTime(ctx context.Context, tx *gorm.DB, from string, to string) ([]dto.NetWorthOverTimeResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var result []dto.NetWorthOverTimeResponse

	tx.Raw(`
		WITH calendar AS (
			SELECT bucket::date AS day FROM generate_series(?::date, ?::date, '-1 week'::interval) bucket
		),
		latest_account_balances AS (
			SELECT
				c.day,
				a.id AS account_id,
				COALESCE((
					SELECT t.balance
					FROM transactions t
          LEFT JOIN uploads u ON t.upload_id = u.id
					WHERE u.bank_account_id = a.id AND t.date <= c.day
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
	`, to, from).Scan(&result)

	return result, nil
}

func (r *trendsRepository) GetCurrentNetWorth(ctx context.Context, tx *gorm.DB) (*dto.CurrentNetWorthResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var result dto.CurrentNetWorthResponse

	tx.Raw(`
		SELECT
			(
				(SELECT COALESCE(SUM(balance), 0) FROM accounts) +
				(SELECT COALESCE(SUM(balance), 0) FROM investment_accounts)
			) AS amount,
			TO_CHAR(NOW(), 'YYYY-MM-DD') AS date
	`).Scan(&result)

	return &result, nil
}

func (r *trendsRepository) GetExpensesOverTime(ctx context.Context, tx *gorm.DB, from string, to string) ([]dto.ExpensesOverTimeResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var result []dto.ExpensesOverTimeResponse

	err := tx.Raw(`
		WITH daily_expenses AS (
			SELECT
				DATE_TRUNC('day', t.date) AS day,
				ABS(SUM(t.amount)) AS daily_amount
			FROM transactions t
			LEFT JOIN categories cat ON t.category_id = cat.id
			WHERE cat.type = 'expense' 
				AND t.date >= ?::date 
				AND t.date <= ?::date
			GROUP BY DATE_TRUNC('day', t.date)
		),
		calendar AS (
			SELECT 
				DATE_TRUNC('day', bucket) AS day,
				EXTRACT(EPOCH FROM (DATE_TRUNC('day', bucket) - ?::date)) / 86400 AS day_number
			FROM generate_series(?::date, ?::date, '1 day'::interval) bucket
		),
		running_totals AS (
			SELECT
				c.day_number::int AS day,
				SUM(COALESCE(de.daily_amount, 0)) OVER (ORDER BY c.day_number) AS amount
			FROM calendar c
			LEFT JOIN daily_expenses de ON c.day = de.day
			ORDER BY c.day_number
		)
		SELECT day, amount FROM running_totals
	`, from, to, from, from, to).Scan(&result).Error

	if err != nil {
		return nil, err
	}

	return result, nil
}
