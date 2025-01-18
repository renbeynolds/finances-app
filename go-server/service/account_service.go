package service

import (
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
)

type AccountService interface {
	Create(account request.CreateAccountRequest) response.AccountResponse
	FindAll() []response.AccountResponse
}
