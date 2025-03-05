package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/repository"
)

type AccountServiceImpl struct {
	AccountRepository repository.AccountRepository
	Validate          *validator.Validate
}

func NewAccountServiceImpl(accountRepository repository.AccountRepository) AccountService {
	return &AccountServiceImpl{
		AccountRepository: accountRepository,
	}
}

func (t *AccountServiceImpl) Create(account request.CreateAccountRequest) response.AccountResponse {
	accountModel := model.Account{
		Name:              account.Name,
		DateHeader:        account.DateHeader,
		DescriptionHeader: account.DescriptionHeader,
		AmountsType:       account.AmountsType,
		StartingAmount:    account.StartingAmount,
		Balance:           account.StartingAmount,
	}
	if account.TypeHeader != "" {
		accountModel.TypeHeader = &account.TypeHeader
	}
	if account.AmountHeader != "" {
		accountModel.AmountHeader = &account.AmountHeader
	}
	if account.IncomeHeader != "" {
		accountModel.IncomeHeader = &account.IncomeHeader
	}
	if account.ExpenseHeader != "" {
		accountModel.ExpenseHeader = &account.ExpenseHeader
	}

	accountModel = t.AccountRepository.Insert(accountModel)
	return response.AccountResponse{
		Id:   int(accountModel.ID),
		Name: accountModel.Name,
	}
}

func (t *AccountServiceImpl) FindAll() []response.AccountResponse {
	result := t.AccountRepository.FindAll()

	accounts := []response.AccountResponse{}
	for _, value := range result {
		account := response.AccountResponse{
			Id:                int(value.ID),
			Name:              value.Name,
			DateHeader:        value.DateHeader,
			DescriptionHeader: value.DescriptionHeader,
			StartingAmount:    value.StartingAmount,
			Balance:           value.Balance,
			AmountsType:       value.AmountsType,
		}

		if value.AmountHeader != nil {
			account.AmountHeader = *value.AmountHeader
		}
		if value.Color != nil {
			account.Color = *value.Color
		}
		accounts = append(accounts, account)
	}

	return accounts
}
