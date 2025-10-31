package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/modules/trends/dto"
	"gorm.io/gorm"
)

type (
	TrendsRepository interface {
		GetIncomeVsExpense(ctx context.Context, tx *gorm.DB, from string, to string) ([]dto.IncomeVsExpenseResponse, error)
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
