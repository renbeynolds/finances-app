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
	Validate *validator.Validate
}

func NewAccountServiceImpl(accountRepository repository.AccountRepository) AccountService {
	return &AccountServiceImpl{
		AccountRepository: accountRepository,
	}
}

func (t *AccountServiceImpl) Create(account request.CreateAccountRequest) response.AccountResponse {
	accountModel := model.Account{
		Name: account.Name,
	}
	accountModel = t.AccountRepository.Insert(accountModel)
	return response.AccountResponse{
		Id: int(accountModel.ID),
		Name: accountModel.Name,
	}
}

func (t *AccountServiceImpl) FindAll() []response.AccountResponse {
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