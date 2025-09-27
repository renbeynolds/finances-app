package validation

import (
	"github.com/go-playground/validator/v10"
)

func CreateInvestmentAccountRequestValidationMessageBuilder(fieldError validator.FieldError) string {
	switch fieldError.Field() {
	case "Name":
		return "name is required"
	}
	// default error
	return fieldError.Error()
}
