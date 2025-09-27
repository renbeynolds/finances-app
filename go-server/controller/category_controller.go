package controller

import (
	"github.com/gin-gonic/gin"
)

type CategoryController interface {
	Create(*gin.Context)
	FindAll(*gin.Context)
}
