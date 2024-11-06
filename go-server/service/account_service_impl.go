package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/repository"
)

type AccountServiceImpl struct {
	AccountRepository repository.AccountRepository
	Validate *validator.Validate
}

func NewAccountServiceImpl(accountRepository repository.AccountRepository, validate *validator.Validate) AccountService {
	return &AccountServiceImpl{
		AccountRepository: accountRepository,
		Validate: validate,
	}
}

func (t AccountServiceImpl) FindAll() []response.AccountResponse {
	result := t.AccountRepository.FindAll()

	var accounts []response.AccountResponse
	for _, value := range result {
		account := response.AccountResponse{
			Id:   int(value.ID),
			Name: value.Name,
		}
		accounts = append(accounts, account)
	}

	return accounts
}