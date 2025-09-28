package service

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/banking/dto"
	"github.com/renbeynolds/finances-app/modules/banking/repository"
	"gorm.io/gorm"
)

type BankAccountService interface {
	CreateBankAccount(ctx context.Context, req dto.CreateBankAccountRequest) (dto.BankAccountResponse, error)
	GetAllBankAccounts(ctx context.Context) ([]dto.BankAccountResponse, error)
	GetBankAccountByID(ctx context.Context, id uint) (dto.BankAccountResponse, error)
	UpdateBankAccount(ctx context.Context, req dto.UpdateBankAccountRequest, id uint) (dto.BankAccountResponse, error)
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

func (s *bankAccountService) CreateBankAccount(ctx context.Context, req dto.CreateBankAccountRequest) (dto.BankAccountResponse, error) {
	bankAccount := entities.BankAccount{
		Name:              req.Name,
		DateHeader:        req.DateHeader,
		DescriptionHeader: req.DescriptionHeader,
		AmountExpression:  req.AmountExpression,
		StartingAmount:    req.StartingAmount,
		LoginURL:          req.LoginURL,
	}

	createdBankAccount, err := s.bankAccountRepository.CreateBankAccount(ctx, s.db, bankAccount)
	if err != nil {
		return dto.BankAccountResponse{}, err
	}

	return entityToResponse(createdBankAccount), nil
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

func (s *bankAccountService) UpdateBankAccount(ctx context.Context, req dto.UpdateBankAccountRequest, id uint) (dto.BankAccountResponse, error) {
	bankAccount, err := s.bankAccountRepository.GetBankAccountByID(ctx, s.db, id)
	if err != nil {
		return dto.BankAccountResponse{}, err
	}

	if req.Name != nil {
		bankAccount.Name = *req.Name
	}
	if req.DateHeader != nil {
		bankAccount.DateHeader = *req.DateHeader
	}
	if req.DescriptionHeader != nil {
		bankAccount.DescriptionHeader = *req.DescriptionHeader
	}
	if req.AmountExpression != nil {
		bankAccount.AmountExpression = *req.AmountExpression
	}
	if req.LoginURL != nil {
		bankAccount.LoginURL = req.LoginURL
	}

	updatedBankAccount, err := s.bankAccountRepository.UpdateBankAccount(ctx, s.db, bankAccount)
	if err != nil {
		return dto.BankAccountResponse{}, err
	}

	return entityToResponse(updatedBankAccount), nil
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
