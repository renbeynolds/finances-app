package controller

import (
	"github.com/gin-gonic/gin"
)

type AccountController interface {
	Create(*gin.Context)
	FindAll(*gin.Context)
	FindByID(*gin.Context)
}
