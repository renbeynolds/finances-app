package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/modules/budgets/dto"
)

type BudgetValidation struct {
	validator *validator.Validate
}

func NewBudgetValidation() *BudgetValidation {
	return &BudgetValidation{
		validator: validator.New(),
	}
}

func (v *BudgetValidation) ValidateCreateBudget(req dto.CreateBudgetRequest) error {
	return v.validator.Struct(req)
}

func (v *BudgetValidation) ValidateUpdateBudget(req dto.UpdateBudgetRequest) error {
	return v.validator.Struct(req)
}
