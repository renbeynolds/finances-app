package service

import (
	"context"

	"github.com/renbeynolds/finances-app/modules/trends/dto"
	"github.com/renbeynolds/finances-app/modules/trends/query"
	"github.com/renbeynolds/finances-app/modules/trends/repository"
	"gorm.io/gorm"
)

type TrendsService interface {
	GetIncomeVsExpense(ctx context.Context, q query.IncomeVsExpenseQuery) ([]dto.IncomeVsExpenseResponse, error)
	GetNetWorthOverTime(ctx context.Context, q query.NetWorthOverTimeQuery) ([]dto.NetWorthOverTimeResponse, error)
	GetCurrentNetWorth(ctx context.Context) (*dto.CurrentNetWorthResponse, error)
	GetExpensesOverTime(ctx context.Context, q query.ExpensesOverTimeQuery) ([]dto.ExpensesOverTimeResponse, error)
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

func (s *trendsService) GetIncomeVsExpense(ctx context.Context, q query.IncomeVsExpenseQuery) ([]dto.IncomeVsExpenseResponse, error) {
	return s.trendsRepository.GetIncomeVsExpense(ctx, s.db, *q.From, *q.To)
}

func (s *trendsService) GetNetWorthOverTime(ctx context.Context, q query.NetWorthOverTimeQuery) ([]dto.NetWorthOverTimeResponse, error) {
	return s.trendsRepository.GetNetWorthOverTime(ctx, s.db, *q.From, *q.To)
}

func (s *trendsService) GetCurrentNetWorth(ctx context.Context) (*dto.CurrentNetWorthResponse, error) {
	return s.trendsRepository.GetCurrentNetWorth(ctx, s.db)
}

func (s *trendsService) GetExpensesOverTime(ctx context.Context, q query.ExpensesOverTimeQuery) ([]dto.ExpensesOverTimeResponse, error) {
	return s.trendsRepository.GetExpensesOverTime(ctx, s.db, *q.From, *q.To)
}
