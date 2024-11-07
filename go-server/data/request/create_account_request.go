package request

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/model"
)

type CreateAccountRequest struct {
	Name string `validate:"required,min=1,max=200" json:"name"`
	DateHeader string `validate:"required,min=1,max=200" json:"dateHeader"`
	DescriptionHeader string `validate:"required,min=1,max=200" json:"descriptionHeader"`
	AmountsType string `validate:"required,oneof=negamtexp posamtexp septypecol sepincexp" json:"amountsType"`
	TypeHeader string `json:"typeHeader"`
	AmountHeader string `json:"amountHeader"`
	IncomeHeader string `json:"incomeHeader"`
	ExpenseHeader string `json:"expenseHeader"`
	StartingAmount string `json:"startingAmount"` // TODO: Validate this is 2 decimal number
}

func CreateAccountRequestStructLevelValidation(sl validator.StructLevel) {

	req := sl.Current().Interface().(CreateAccountRequest)

	if req.AmountsType == model.SeparateTypeColumn && req.TypeHeader == "" {
		sl.ReportError(req.TypeHeader, "TypeHeader", "TypeHeader", "typeheader", "")
	}

	if req.AmountsType != model.SeparateIncomeExpenseColumns && req.AmountHeader == "" {
		sl.ReportError(req.AmountHeader, "AmountHeader", "AmountHeader", "amountheader", "")
	}

	if req.AmountsType == model.SeparateIncomeExpenseColumns && req.IncomeHeader == "" {
		sl.ReportError(req.IncomeHeader, "IncomeHeader", "IncomeHeader", "incomeheader", "")
	}

	if req.AmountsType == model.SeparateIncomeExpenseColumns && req.ExpenseHeader == "" {
		sl.ReportError(req.ExpenseHeader, "ExpenseHeader", "ExpenseHeader", "expenseheader", "")
	}

}

func CreateAccountRequestValidationMessage(fieldError validator.FieldError) string {
	switch fieldError.Field() {
	case "Name":
		return "name is required"
	case "DateHeader":
		return "dateHeader is required"
	case "DescriptionHeader":
		return "descriptionHeader is required"
	case "AmountsType":
		return "amountsType must be one of: negamtexp, posamtexp, septypecol, sepincexp"
	case "TypeHeader":
		return "typeHeader is required when amountsType is septypecol"
	case "AmountHeader":
		return "amountHeader is required unless amountsType is sepincexp"
	case "IncomeHeader":
		return "incomeHeader is required when amountsType is sepincexp"
	case "ExpenseHeader":
		return "expenseHeader is required when amountsType is sepincexp"
	}
	// default error
	return fieldError.Error()
}