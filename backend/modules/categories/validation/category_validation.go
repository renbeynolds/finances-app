package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/modules/categories/dto"
)

type CategoryValidation struct {
	validator *validator.Validate
}

func NewCategoryValidation() *CategoryValidation {
	return &CategoryValidation{
		validator: validator.New(),
	}
}

func (v *CategoryValidation) ValidateCreateCategory(req dto.CreateCategoryRequest) error {
	return v.validator.Struct(req)
}

func (v *CategoryValidation) ValidateUpdateCategory(req dto.UpdateCategoryRequest) error {
	return v.validator.Struct(req)
}
