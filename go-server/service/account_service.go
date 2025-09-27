package service

import (
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
)

type AccountService interface {
	Create(account request.CreateAccountRequest) response.AccountResponse
	FindAll() []response.AccountResponse
	FindByID(id uint) response.AccountResponse
	Update(account request.UpdateAccountRequest) response.AccountResponse
	GetBalanceOverTime(id uint, from, to string) []response.AmountOverTimeResponse
}
