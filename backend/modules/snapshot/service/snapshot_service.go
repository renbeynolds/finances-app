package service

import (
	"context"

	"github.com/renbeynolds/finances-app/modules/snapshot/dto"
	"github.com/renbeynolds/finances-app/modules/snapshot/repository"
	"gorm.io/gorm"
)

type SnapshotService interface {
	GetIncomeVsAverage(ctx context.Context, from, to, avgFrom, avgTo string) dto.AmountVsAverageResponse
	GetExpenseVsAverage(ctx context.Context, from, to, avgFrom, avgTo string) dto.AmountVsAverageResponse
}

type snapshotService struct {
	snapshotRepository repository.SnapshotRepository
	db                 *gorm.DB
}

func NewSnapshotService(
	snapshotRepo repository.SnapshotRepository,
	db *gorm.DB,
) SnapshotService {
	return &snapshotService{
		snapshotRepository: snapshotRepo,
		db:                 db,
	}
}

func (s *snapshotService) GetIncomeVsAverage(ctx context.Context, from, to, avgFrom, avgTo string) dto.AmountVsAverageResponse {
	return s.snapshotRepository.GetAmountVsAverage(ctx, s.db, "income", from, to, avgFrom, avgTo)
}

func (s *snapshotService) GetExpenseVsAverage(ctx context.Context, from, to, avgFrom, avgTo string) dto.AmountVsAverageResponse {
	return s.snapshotRepository.GetAmountVsAverage(ctx, s.db, "expense", from, to, avgFrom, avgTo)
}
