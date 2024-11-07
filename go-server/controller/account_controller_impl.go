package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/service"
	"github.com/renbeynolds/finances-app/util"
)

type AccountControllerImpl struct {
	accountService service.AccountService
	validate *validator.Validate
}

func NewAccountControllerImpl(service service.AccountService, validate *validator.Validate) AccountController {
	return &AccountControllerImpl{
		accountService: service,
		validate: validate,
	}
}

func (controller *AccountControllerImpl) Create(ctx *gin.Context) {
	createAccountRequest := request.CreateAccountRequest{}
	err := ctx.ShouldBindJSON(&createAccountRequest)
	util.ErrorPanic(err)

	// TODO: Extract this whole block
	err = controller.validate.Struct(createAccountRequest)
	if err != nil {
		validationErrors := []response.ValidationErrorResponse{}
		for _, err := range err.(validator.ValidationErrors) {
			// In this case data object is actually holding the User struct
			var elem response.ValidationErrorResponse

			elem.Param = err.Field() // Export struct field name
			elem.Message = request.CreateAccountRequestValidationMessage(err)

			validationErrors = append(validationErrors, elem)
		}

		webResponse := response.Response{
			Code: http.StatusBadRequest,
			Status: "Error",
			Data: validationErrors,
		}
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusOK, webResponse)
		return
	}


	accountResponse := controller.accountService.Create(createAccountRequest)
	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   accountResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *AccountControllerImpl) FindAll(ctx *gin.Context) {
	accountResponse := controller.accountService.FindAll()

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   accountResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}