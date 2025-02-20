package controller

import (
	"github.com/gin-gonic/gin"
)

type TransactionController interface {
	FindAll(*gin.Context)
	Update(*gin.Context)
}
