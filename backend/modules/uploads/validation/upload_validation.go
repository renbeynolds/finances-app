package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/modules/uploads/dto"
)

type UploadValidation struct {
	validator *validator.Validate
}

func NewUploadValidation() *UploadValidation {
	return &UploadValidation{
		validator: validator.New(),
	}
}

func (v *UploadValidation) ValidateCreateUpload(req dto.CreateUploadRequest) error {
	return v.validator.Struct(req)
}
