package service

import (
	"context"
	"time"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/investments/dto"
	"github.com/renbeynolds/finances-app/modules/investments/repository"
	"gorm.io/gorm"
)

type InvestmentAccountService interface {
	CreateInvestmentAccount(ctx context.Context, req dto.CreateInvestmentAccountRequest) (dto.InvestmentAccountResponse, error)
	GetAllInvestmentAccounts(ctx context.Context) ([]dto.InvestmentAccountResponse, error)
	GetInvestmentAccountByID(ctx context.Context, id uint) (dto.InvestmentAccountResponse, error)
	UpdateInvestmentAccount(ctx context.Context, req dto.UpdateInvestmentAccountRequest, id uint) (dto.InvestmentAccountResponse, error)
}

type investmentAccountService struct {
	investmentAccountRepository repository.InvestmentAccountRepository
	db                          *gorm.DB
}

func NewInvestmentAccountService(
	investmentAccountRepo repository.InvestmentAccountRepository,
	db *gorm.DB,
) InvestmentAccountService {
	return &investmentAccountService{
		investmentAccountRepository: investmentAccountRepo,
		db:                          db,
	}
}

func (s *investmentAccountService) CreateInvestmentAccount(ctx context.Context, req dto.CreateInvestmentAccountRequest) (dto.InvestmentAccountResponse, error) {
	investmentAccount := entities.InvestmentAccount{
		Name: req.Name,
	}

	createdInvestmentAccount, err := s.investmentAccountRepository.CreateInvestmentAccount(ctx, s.db, investmentAccount)
	if err != nil {
		return dto.InvestmentAccountResponse{}, err
	}

	return entityToResponse(createdInvestmentAccount), nil
}

func (s *investmentAccountService) GetAllInvestmentAccounts(ctx context.Context) ([]dto.InvestmentAccountResponse, error) {
	investmentAccounts, err := s.investmentAccountRepository.GetAllInvestmentAccounts(ctx, s.db)
	if err != nil {
		return nil, err
	}

	var responses []dto.InvestmentAccountResponse
	for _, account := range investmentAccounts {
		responses = append(responses, entityToResponse(account))
	}
	return responses, nil
}

func (s *investmentAccountService) GetInvestmentAccountByID(ctx context.Context, id uint) (dto.InvestmentAccountResponse, error) {
	investmentAccount, err := s.investmentAccountRepository.GetInvestmentAccountByID(ctx, s.db, id)
	if err != nil {
		return dto.InvestmentAccountResponse{}, err
	}

	return entityToResponse(investmentAccount), nil
}

func (s *investmentAccountService) UpdateInvestmentAccount(ctx context.Context, req dto.UpdateInvestmentAccountRequest, id uint) (dto.InvestmentAccountResponse, error) {
	investmentAccount, err := s.investmentAccountRepository.GetInvestmentAccountByID(ctx, s.db, id)
	if err != nil {
		return dto.InvestmentAccountResponse{}, err
	}

	if req.Name != nil {
		investmentAccount.Name = *req.Name
	}

	updatedInvestmentAccount, err := s.investmentAccountRepository.UpdateInvestmentAccount(ctx, s.db, investmentAccount)
	if err != nil {
		return dto.InvestmentAccountResponse{}, err
	}

	return entityToResponse(updatedInvestmentAccount), nil
}

func entityToResponse(entity entities.InvestmentAccount) dto.InvestmentAccountResponse {
	return dto.InvestmentAccountResponse{
		ID:        entity.ID,
		Name:      entity.Name,
		Balance:   entity.Balance,
		UpdatedAt: entity.UpdatedAt.Format(time.RFC3339),
	}
}
