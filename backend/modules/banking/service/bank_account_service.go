package service

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/banking/dto"
	"github.com/renbeynolds/finances-app/modules/banking/repository"
	"gorm.io/gorm"
)

type BankAccountService interface {
	GetAllBankAccounts(ctx context.Context) ([]dto.BankAccountResponse, error)
	GetBankAccountByID(ctx context.Context, id uint) (dto.BankAccountResponse, error)
}

type bankAccountService struct {
	bankAccountRepository repository.BankAccountRepository
	db                    *gorm.DB
}

func NewBankAccountService(
	bankAccountRepo repository.BankAccountRepository,
	db *gorm.DB,
) BankAccountService {
	return &bankAccountService{
		bankAccountRepository: bankAccountRepo,
		db:                    db,
	}
}

func (s *bankAccountService) GetAllBankAccounts(ctx context.Context) ([]dto.BankAccountResponse, error) {
	bankAccounts, err := s.bankAccountRepository.GetAllBankAccounts(ctx, s.db)
	if err != nil {
		return nil, err
	}

	var responses []dto.BankAccountResponse
	for _, account := range bankAccounts {
		responses = append(responses, entityToResponse(account))
	}
	return responses, nil
}

func (s *bankAccountService) GetBankAccountByID(ctx context.Context, id uint) (dto.BankAccountResponse, error) {
	bankAccount, err := s.bankAccountRepository.GetBankAccountByID(ctx, s.db, id)
	if err != nil {
		return dto.BankAccountResponse{}, err
	}

	return entityToResponse(bankAccount), nil
}

func entityToResponse(entity entities.BankAccount) dto.BankAccountResponse {
	response := dto.BankAccountResponse{
		ID:                entity.ID,
		Name:              entity.Name,
		DateHeader:        entity.DateHeader,
		DescriptionHeader: entity.DescriptionHeader,
		AmountExpression:  entity.AmountExpression,
		StartingAmount:    entity.StartingAmount,
		Balance:           entity.Balance,
	}
	if entity.Color != nil {
		response.Color = *entity.Color
	}
	if entity.LoginURL != nil {
		response.LoginURL = *entity.LoginURL
	}
	return response
}
