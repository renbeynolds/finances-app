package request

type CreateAccountRequest struct {
	Name              string `validate:"required,min=1,max=200" json:"name"`
	DateHeader        string `validate:"required,min=1,max=200" json:"dateHeader"`
	DescriptionHeader string `validate:"required,min=1,max=200" json:"descriptionHeader"`
	AmountsType       string `validate:"required,oneof=negamtexp posamtexp septypecol sepincexp" json:"amountsType"`
	TypeHeader        string `json:"typeHeader"`
	AmountHeader      string `json:"amountHeader"`
	IncomeHeader      string `json:"incomeHeader"`
	ExpenseHeader     string `json:"expenseHeader"`
	StartingAmount    string `json:"startingAmount"` // TODO: Validate this is 2 decimal number
}
