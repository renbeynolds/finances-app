package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/modules/investments/dto"
)

type InvestmentAccountValidation struct {
	validate *validator.Validate
}

func NewInvestmentAccountValidation() *InvestmentAccountValidation {
	validate := validator.New()

	return &InvestmentAccountValidation{
		validate: validate,
	}
}

func (v *InvestmentAccountValidation) ValidateCreateInvestmentAccountRequest(req dto.CreateInvestmentAccountRequest) error {
	return v.validate.Struct(req)
}

func (v *InvestmentAccountValidation) ValidateUpdateInvestmentAccountRequest(req dto.UpdateInvestmentAccountRequest) error {
	return v.validate.Struct(req)
}
