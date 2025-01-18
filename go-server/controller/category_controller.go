package controller

import (
	"github.com/gin-gonic/gin"
)

type CategoryController interface {
	FindAll(*gin.Context)
}
