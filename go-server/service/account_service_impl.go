package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/util"
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
		DateFormat:        account.DateFormat,
		DescriptionHeader: account.DescriptionHeader,
		AmountExpression:  account.AmountExpression,
		StartingAmount:    account.StartingAmount,
		Balance:           account.StartingAmount,
		LoginURL:          account.LoginURL,
	}

	accountModel = t.AccountRepository.Insert(accountModel)
	return modelToResponse(accountModel)
}

func (t *AccountServiceImpl) FindAll() []response.AccountResponse {
	result := t.AccountRepository.FindAll()
	return modelsToResponses(result)
}

func (t *AccountServiceImpl) FindByID(id uint) response.AccountResponse {
	account, err := t.AccountRepository.FindByID(id)
	if err != nil {
		// TODO
	}
	return modelToResponse(account)
}

func (t *AccountServiceImpl) GetBalanceOverTime(id uint, from, to string) []response.AmountOverTimeResponse {
	return t.AccountRepository.GetBalanceOverTime(id, from, to)
}

func (t *AccountServiceImpl) Update(account request.UpdateAccountRequest) response.AccountResponse {
	accountData, err := t.AccountRepository.FindByID(account.ID)
	util.ErrorPanic(err)
	accountData.Name = account.Name
	accountData.DateHeader = account.DateHeader
	accountData.DateFormat = account.DateFormat
	accountData.DescriptionHeader = account.DescriptionHeader
	accountData.AmountExpression = account.AmountExpression
	accountData.LoginURL = account.LoginURL
	updatedAccount := t.AccountRepository.Update(accountData)
	return modelToResponse(updatedAccount)
}

func modelToResponse(model model.Account) response.AccountResponse {
	response := response.AccountResponse{
		Id:                int(model.ID),
		Name:              model.Name,
		DateHeader:        model.DateHeader,
		DateFormat:        model.DateFormat,
		DescriptionHeader: model.DescriptionHeader,
		AmountExpression:  model.AmountExpression,
		StartingAmount:    model.StartingAmount,
		Balance:           model.Balance,
	}
	if model.Color != nil {
		response.Color = *model.Color
	}
	if model.LoginURL != nil {
		response.LoginURL = *model.LoginURL
	}
	return response
}

func modelsToResponses(models []model.Account) []response.AccountResponse {
	responses := []response.AccountResponse{}
	for _, model := range models {
		responses = append(responses, modelToResponse(model))
	}
	return responses
}
