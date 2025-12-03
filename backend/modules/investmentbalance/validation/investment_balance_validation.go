package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/dto"
)

type InvestmentBalanceValidation struct {
	validate *validator.Validate
}

func NewInvestmentBalanceValidation() *InvestmentBalanceValidation {
	validate := validator.New()

	return &InvestmentBalanceValidation{
		validate: validate,
	}
}

func (v *InvestmentBalanceValidation) ValidateCreateInvestmentBalanceRequest(req dto.CreateInvestmentBalanceRequest) error {
	return v.validate.Struct(req)
}
