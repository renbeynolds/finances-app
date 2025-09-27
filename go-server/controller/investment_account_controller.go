package controller

import (
	"github.com/gin-gonic/gin"
)

type InvestmentAccountController interface {
	Create(*gin.Context)
	FindAll(*gin.Context)
	FindByID(*gin.Context)
	RecordBalance(*gin.Context)
}
