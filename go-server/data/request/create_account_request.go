package request

import "github.com/go-playground/validator/v10"

type CreateAccountRequest struct {
	Name string `validate:"required,min=1,max=200" json:"name"`
	DateHeader string `validate:"required,min=1,max=200" json:"dateHeader"`
	DescriptionHeader string `validate:"required,min=1,max=200" json:"descriptionHeader"`
}

func CreateAccountRequestValidationMessage(fieldError validator.FieldError) string {
	switch fieldError.Field() {
	case "Name":
		return "name is required"
	case "DateHeader":
		return "dateHeader is required"
	case "DescriptionHeader":
		return "descriptionHeader is required"
	}
	// default error
	return fieldError.Error()
}