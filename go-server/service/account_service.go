package service

import (
	"github.com/renbeynolds/finances-app/data/response"
)


type AccountService interface {
	FindAll() []response.AccountResponse
}