package service

import (
	"context"
	"time"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/dto"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/repository"
	investmentRepository "github.com/renbeynolds/finances-app/modules/investments/repository"
	"gorm.io/gorm"
)

type InvestmentBalanceService interface {
	CreateInvestmentBalance(ctx context.Context, req dto.CreateInvestmentBalanceRequest) (dto.InvestmentBalanceResponse, error)
}

type investmentBalanceService struct {
	investmentBalanceRepository repository.InvestmentBalanceRepository
	investmentAccountRepository investmentRepository.InvestmentAccountRepository
	db                          *gorm.DB
}

func NewInvestmentBalanceService(
	investmentBalanceRepo repository.InvestmentBalanceRepository,
	investmentAccountRepo investmentRepository.InvestmentAccountRepository,
	db *gorm.DB,
) InvestmentBalanceService {
	return &investmentBalanceService{
		investmentBalanceRepository: investmentBalanceRepo,
		investmentAccountRepository: investmentAccountRepo,
		db:                          db,
	}
}

func (s *investmentBalanceService) CreateInvestmentBalance(ctx context.Context, req dto.CreateInvestmentBalanceRequest) (dto.InvestmentBalanceResponse, error) {
	var createdInvestmentBalance entities.InvestmentAccountBalance

	// Use a transaction to ensure both operations succeed or fail together
	err := s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// Create the investment balance record
		investmentBalance := entities.InvestmentAccountBalance{
			InvestmentAccountID: req.InvestmentAccountID,
			Balance:             req.Balance,
			Date:                req.Date.Time,
		}

		created, err := s.investmentBalanceRepository.CreateInvestmentBalance(ctx, tx, investmentBalance)
		if err != nil {
			return err
		}
		createdInvestmentBalance = created

		// Get the investment account to update its balance
		investmentAccount, err := s.investmentAccountRepository.GetInvestmentAccountByID(ctx, tx, req.InvestmentAccountID)
		if err != nil {
			return err
		}

		// Update the investment account's balance
		investmentAccount.Balance = req.Balance
		_, err = s.investmentAccountRepository.UpdateInvestmentAccount(ctx, tx, investmentAccount)
		if err != nil {
			return err
		}

		return nil
	})

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
