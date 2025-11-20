package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/modules/snapshot/dto"
	"gorm.io/gorm"
)

type (
	SnapshotRepository interface {
		GetAmountVsAverage(ctx context.Context, tx *gorm.DB, amountType, from, to, avgFrom, avgTo string) dto.AmountVsAverageResponse
	}

	snapshotRepository struct {
		db *gorm.DB
	}
)

func NewSnapshotRepository(db *gorm.DB) SnapshotRepository {
	return &snapshotRepository{
		db: db,
	}
}

func (r *snapshotRepository) GetAmountVsAverage(ctx context.Context, tx *gorm.DB, amountType, from, to, avgFrom, avgTo string) dto.AmountVsAverageResponse {
	if tx == nil {
		tx = r.db
	}

	var amount int64
	var average int64
	var median float64

	tx.Raw(`
		SELECT COALESCE(ABS(SUM(t.amount)), 0) as amount
		FROM transactions t
		LEFT JOIN categories c ON t.category_id = c.id
		WHERE
			c.type = ? AND
			t.date >= ? AND t.date <= ?
	`, amountType, from, to).Scan(&amount)

	tx.Raw(`
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

	tx.Raw(`
	  WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series(?, ?, '1 month'::interval) bucket
    )
    SELECT
      COALESCE(TRUNC(ABS(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY sums.total))), 0) as median
    FROM (
      SELECT
        SUM(amount) AS "total"
      FROM calendar c
      LEFT JOIN transactions t ON DATE_TRUNC('month', t.date) = c.month
      LEFT JOIN categories cat ON t.category_id = cat.id
      WHERE cat.type = ?
      GROUP BY c.month
    ) sums
	`, avgFrom, avgTo, amountType).Scan(&median)

	return dto.AmountVsAverageResponse{
		Amount:  amount,
		Average: average,
		Median:  int64(median),
	}
}
