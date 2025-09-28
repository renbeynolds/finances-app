package validation

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
)

func NewValidator() *validator.Validate {
	validate := validator.New()
	return validate
}

type ValidationMessageBuilder func(fe validator.FieldError) string

func Validate(validate *validator.Validate, obj interface{}, msgBuilder ValidationMessageBuilder, ctx *gin.Context) bool {
	err := validate.Struct(obj)
	if err != nil {
		validationErrors := []response.ValidationErrorResponse{}
		for _, err := range err.(validator.ValidationErrors) {
			var elem response.ValidationErrorResponse

			elem.Param = err.Field() // Export struct field name
			elem.Message = msgBuilder(err)

			validationErrors = append(validationErrors, elem)
		}

		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Error",
			Data:   validationErrors,
		}
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusBadRequest, webResponse)
		return false
	}
	return true
}
