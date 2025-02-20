package validation

import (
	"github.com/go-playground/validator/v10"
)

func UpdateTransactionRequestValidationMessageBuilder(fieldError validator.FieldError) string {
	// default error
	return fieldError.Error()
}
