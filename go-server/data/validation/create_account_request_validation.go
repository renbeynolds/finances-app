package validation

import (
	"github.com/go-playground/validator/v10"
)

func CreateAccountRequestValidationMessageBuilder(fieldError validator.FieldError) string {
	switch fieldError.Field() {
	case "Name":
		return "name is required"
	case "DateHeader":
		return "dateHeader is required"
	case "DescriptionHeader":
		return "descriptionHeader is required"
	case "AmountExpression":
		return "amountExpression is required"
	}
	// default error
	return fieldError.Error()
}
