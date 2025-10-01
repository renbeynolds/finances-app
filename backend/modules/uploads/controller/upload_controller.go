package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/uploads/dto"
	"github.com/renbeynolds/finances-app/modules/uploads/service"
	"github.com/renbeynolds/finances-app/modules/uploads/validation"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	UploadController interface {
		CreateUpload(ctx *gin.Context)
		GetAllUploads(ctx *gin.Context)
	}

	uploadController struct {
		uploadService    service.UploadService
		uploadValidation *validation.UploadValidation
		db               *gorm.DB
	}
)

func NewUploadController(injector do.Injector, s service.UploadService) UploadController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	uploadValidation := validation.NewUploadValidation()
	return &uploadController{
		uploadService:    s,
		uploadValidation: uploadValidation,
		db:               db,
	}
}

func (c *uploadController) CreateUpload(ctx *gin.Context) {
	var req dto.CreateUploadRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_UPLOAD, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	if err := c.uploadValidation.ValidateCreateUpload(req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_UPLOAD, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	upload, err := c.uploadService.CreateUpload(ctx.Request.Context(), req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_UPLOAD, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_UPLOAD, upload, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *uploadController) GetAllUploads(ctx *gin.Context) {
	uploads, err := c.uploadService.GetAllUploads(ctx.Request.Context())
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LIST_UPLOADS, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LIST_UPLOADS, uploads, nil)
	ctx.JSON(http.StatusOK, res)
}
