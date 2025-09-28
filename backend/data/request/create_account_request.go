package request

type CreateAccountRequest struct {
	Name              string  `validate:"required,min=1,max=200" json:"name"`
	DateHeader        string  `validate:"required,min=1,max=200" json:"dateHeader"`
	DescriptionHeader string  `validate:"required,min=1,max=200" json:"descriptionHeader"`
	AmountExpression  string  `validate:"required,min=1,max=200" json:"amountExpression"`
	StartingAmount    int64   `json:"startingAmount"` // TODO: Validate this is 2 decimal number
	LoginURL          *string `json:"loginUrl"`
}
