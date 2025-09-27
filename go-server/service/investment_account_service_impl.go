package service

import (
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/util"
)

type InvestmentAccountServiceImpl struct {
	InvestmentAccountRepository        repository.InvestmentAccountRepository
	InvestmentAccountBalanceRepository repository.InvestmentAccountBalanceRepository
	Validate                           *validator.Validate
}

func NewInvestmentAccountServiceImpl(accountRepository repository.InvestmentAccountRepository, investmentAccountBalanceRepository repository.InvestmentAccountBalanceRepository) InvestmentAccountService {
	return &InvestmentAccountServiceImpl{
		InvestmentAccountRepository:        accountRepository,
		InvestmentAccountBalanceRepository: investmentAccountBalanceRepository,
	}
}

func (t *InvestmentAccountServiceImpl) Create(account request.CreateInvestmentAccountRequest) response.InvestmentAccountResponse {
	accountModel := model.InvestmentAccount{
		Name: account.Name,
	}

	accountModel = t.InvestmentAccountRepository.Insert(accountModel)
	return investmentAccountModelToResponse(accountModel)
}

func (t *InvestmentAccountServiceImpl) FindAll() []response.InvestmentAccountResponse {
	result := t.InvestmentAccountRepository.FindAll()
	return investmentAccountModelsToResponses(result)
}

func (t *InvestmentAccountServiceImpl) FindByID(id uint) response.InvestmentAccountResponse {
	account, err := t.InvestmentAccountRepository.FindByID(id)
	if err != nil {
		// TODO
	}
	return investmentAccountModelToResponse(account)
}

func (t *InvestmentAccountServiceImpl) RecordBalance(id uint, request request.RecordInvestmentAccountBalanceRequest) response.InvestmentAccountResponse {
	account, err := t.InvestmentAccountRepository.FindByID(id)
	if err != nil {
		// TODO
	}

	date, err := time.Parse("2006-01-02", request.Date)
	if err != nil {
		// TODO
	}
	balance, err := util.ParseMoney(request.Balance)
	if err != nil {
		// TODO
	}

	balanceModel := model.InvestmentAccountBalance{
		InvestmentAccountID: account.ID,
		Date:                date,
		Balance:             balance,
	}

	t.InvestmentAccountBalanceRepository.Insert(balanceModel)

	account.Balance = balance
	account = t.InvestmentAccountRepository.Update(account)
	return investmentAccountModelToResponse(account)
}

func investmentAccountModelToResponse(model model.InvestmentAccount) response.InvestmentAccountResponse {
	response := response.InvestmentAccountResponse{
		Id:        int(model.ID),
		Name:      model.Name,
		Balance:   model.Balance,
		UpdatedAt: model.UpdatedAt.Format(time.RFC3339),
	}
	return response
}

func investmentAccountModelsToResponses(models []model.InvestmentAccount) []response.InvestmentAccountResponse {
	responses := []response.InvestmentAccountResponse{}
	for _, model := range models {
		responses = append(responses, investmentAccountModelToResponse(model))
	}
	return responses
}
