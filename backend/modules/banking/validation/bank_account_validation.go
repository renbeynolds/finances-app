package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/modules/banking/dto"
)

type BankAccountValidation struct {
	validate *validator.Validate
}

func NewBankAccountValidation() *BankAccountValidation {
	validate := validator.New()

	return &BankAccountValidation{
		validate: validate,
	}
}

func (v *BankAccountValidation) ValidateCreateBankAccountRequest(req dto.CreateBankAccountRequest) error {
	return v.validate.Struct(req)
}
