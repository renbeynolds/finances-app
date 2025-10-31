package service

import (
	"github.com/renbeynolds/finances-app/modules/trends/repository"
	"gorm.io/gorm"
)

type TrendsService interface {
	// Service methods will be added here
}

type trendsService struct {
	trendsRepository repository.TrendsRepository
	db               *gorm.DB
}

func NewTrendsService(
	trendsRepo repository.TrendsRepository,
	db *gorm.DB,
) TrendsService {
	return &trendsService{
		trendsRepository: trendsRepo,
		db:               db,
	}
}
