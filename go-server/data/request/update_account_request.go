package request

type UpdateAccountRequest struct {
	ID                uint
	Name              string  `validate:"required,min=1,max=200" json:"name"`
	DateHeader        string  `validate:"required,min=1,max=200" json:"dateHeader"`
	DateFormat        string  `validate:"required,min=1,max=200" json:"dateFormat"`
	DescriptionHeader string  `validate:"required,min=1,max=200" json:"descriptionHeader"`
	AmountExpression  string  `validate:"required,min=1,max=200" json:"amountExpression"`
	LoginURL          *string `json:"loginUrl"`
}
