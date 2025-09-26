package validation

import (
	"github.com/go-playground/validator/v10"
)

func CreateCategoryRequestValidationMessageBuilder(fieldError validator.FieldError) string {
	switch fieldError.Field() {
	case "Name":
		return "name is required"
	case "Type":
		return "type is required"
	}
	// default error
	return fieldError.Error()
}
