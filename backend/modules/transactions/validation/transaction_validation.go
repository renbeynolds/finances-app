package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/modules/transactions/dto"
)

type TransactionValidation struct {
	validator *validator.Validate
}

func NewTransactionValidation() *TransactionValidation {
	return &TransactionValidation{
		validator: validator.New(),
	}
}

func (v *TransactionValidation) ValidateUpdateTransaction(req dto.UpdateTransactionRequest) error {
	return v.validator.Struct(req)
}
