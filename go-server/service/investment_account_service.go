package service

import (
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
)

type InvestmentAccountService interface {
	Create(account request.CreateInvestmentAccountRequest) response.InvestmentAccountResponse
	FindAll() []response.InvestmentAccountResponse
	FindByID(id uint) response.InvestmentAccountResponse
	RecordBalance(id uint, request request.RecordInvestmentAccountBalanceRequest) response.InvestmentAccountResponse
}
