package service

import (
	"context"
	"time"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/dto"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/repository"
	"gorm.io/gorm"
)

type InvestmentBalanceService interface {
	CreateInvestmentBalance(ctx context.Context, req dto.CreateInvestmentBalanceRequest) (dto.InvestmentBalanceResponse, error)
}

type investmentBalanceService struct {
	investmentBalanceRepository repository.InvestmentBalanceRepository
	db                          *gorm.DB
}

func NewInvestmentBalanceService(
	investmentBalanceRepo repository.InvestmentBalanceRepository,
	db *gorm.DB,
) InvestmentBalanceService {
	return &investmentBalanceService{
		investmentBalanceRepository: investmentBalanceRepo,
		db:                          db,
	}
}

func (s *investmentBalanceService) CreateInvestmentBalance(ctx context.Context, req dto.CreateInvestmentBalanceRequest) (dto.InvestmentBalanceResponse, error) {
	investmentBalance := entities.InvestmentAccountBalance{
		InvestmentAccountID: req.InvestmentAccountID,
		Balance:             req.Balance,
		Date:                req.Date.Time,
	}

	createdInvestmentBalance, err := s.investmentBalanceRepository.CreateInvestmentBalance(ctx, s.db, investmentBalance)
	if err != nil {
		return dto.InvestmentBalanceResponse{}, err
	}

	return entityToResponse(createdInvestmentBalance), nil
}

func entityToResponse(entity entities.InvestmentAccountBalance) dto.InvestmentBalanceResponse {
	return dto.InvestmentBalanceResponse{
		ID:                  entity.ID,
		InvestmentAccountID: entity.InvestmentAccountID,
		Balance:             entity.Balance,
		Date:                dto.DateOnly{Time: entity.Date},
		CreatedAt:           entity.CreatedAt.Format(time.RFC3339),
		UpdatedAt:           entity.UpdatedAt.Format(time.RFC3339),
	}
}
