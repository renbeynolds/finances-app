package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/categories/dto"
	queryPkg "github.com/renbeynolds/finances-app/modules/categories/query"
	"gorm.io/gorm"
)

type (
	CategoryRepository interface {
		CreateCategory(ctx context.Context, tx *gorm.DB, category entities.Category) (entities.Category, error)
		GetAllCategories(ctx context.Context, tx *gorm.DB) ([]entities.Category, error)
		GetCategoryByID(ctx context.Context, tx *gorm.DB, id uint) (entities.Category, error)
		UpdateCategory(ctx context.Context, tx *gorm.DB, category entities.Category) (entities.Category, error)
		GetTopSpendingCategories(ctx context.Context, tx *gorm.DB, query *queryPkg.TopSpendingCategoriesQuery) ([]dto.TopSpendingCategoryResponse, error)
		GetCategoryAmountOverTime(ctx context.Context, tx *gorm.DB, categoryId, from, to string) ([]dto.CategoryAmountOverTimeResponse, error)
	}

	categoryRepository struct {
		db *gorm.DB
	}
)

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{
		db: db,
	}
}

func (r *categoryRepository) CreateCategory(ctx context.Context, tx *gorm.DB, category entities.Category) (entities.Category, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Create(&category).Error; err != nil {
		return entities.Category{}, err
	}

	return category, nil
}

func (r *categoryRepository) GetAllCategories(ctx context.Context, tx *gorm.DB) ([]entities.Category, error) {
	if tx == nil {
		tx = r.db
	}

	var categories []entities.Category
	if err := tx.WithContext(ctx).Preload("PrefixRules").Preload("Budget").Find(&categories).Error; err != nil {
		return nil, err
	}

	return categories, nil
}

func (r *categoryRepository) GetCategoryByID(ctx context.Context, tx *gorm.DB, id uint) (entities.Category, error) {
	if tx == nil {
		tx = r.db
	}

	var category entities.Category
	if err := tx.WithContext(ctx).First(&category, id).Error; err != nil {
		return entities.Category{}, err
	}

	return category, nil
}

func (r *categoryRepository) UpdateCategory(ctx context.Context, tx *gorm.DB, category entities.Category) (entities.Category, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Save(&category).Error; err != nil {
		return entities.Category{}, err
	}

	return category, nil
}

func (r *categoryRepository) GetTopSpendingCategories(ctx context.Context, tx *gorm.DB, query *queryPkg.TopSpendingCategoriesQuery) ([]dto.TopSpendingCategoryResponse, error) {
	if tx == nil {
		tx = r.db
	}

	const numCategories = 10

	var result []dto.TopSpendingCategoryResponse

	tx.Raw(`
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
    SELECT name, categoryid AS id, -1 * data AS total, color FROM (
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
	`, query.From, query.To, numCategories, numCategories).Scan(&result)

	if result == nil {
		result = []dto.TopSpendingCategoryResponse{}
	}

	return result, nil
}

func (r *categoryRepository) GetCategoryAmountOverTime(ctx context.Context, tx *gorm.DB, categoryId, from, to string) ([]dto.CategoryAmountOverTimeResponse, error) {
	if tx == nil {
		tx = r.db
	}

	var result []dto.CategoryAmountOverTimeResponse

	tx.Raw(`
		WITH calendar AS (
			SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series(?, ?, '1 month'::interval) bucket
		)
    SELECT
      COALESCE(ABS(SUM(t.amount)), 0) AS amount,
      TO_CHAR(c.month, 'YYYY-MM') as date
    FROM calendar c
		LEFT JOIN transactions t ON DATE_TRUNC('month', t.date) = c.month AND t.category_id = ?
		GROUP BY c.month
		ORDER BY c.month ASC
  `, from, to, categoryId).Scan(&result)

	if result == nil {
		result = []dto.CategoryAmountOverTimeResponse{}
	}

	return result, nil
}
