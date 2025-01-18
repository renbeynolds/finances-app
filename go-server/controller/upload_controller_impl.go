package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/service"
)

type UploadControllerImpl struct {
	uploadService service.UploadService
	validate      *validator.Validate
}

func NewUploadControllerImpl(service service.UploadService, validate *validator.Validate) UploadController {
	return &UploadControllerImpl{
		uploadService: service,
		validate:      validate,
	}
}

func (controller *UploadControllerImpl) FindAll(ctx *gin.Context) {
	foundUploads := controller.uploadService.FindAll()
	response.SendStatusOK(foundUploads, nil, ctx)
}
