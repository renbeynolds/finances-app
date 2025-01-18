package controller

import (
	"github.com/gin-gonic/gin"
)

type UploadController interface {
	FindAll(*gin.Context)
}