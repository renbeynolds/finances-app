package repository

import (
	"gorm.io/gorm"
)

type (
	TrendsRepository interface {
		// Repository methods will be added here
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
