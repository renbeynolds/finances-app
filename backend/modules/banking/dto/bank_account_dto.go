package dto

const (
	MESSAGE_FAILED_LIST_BANK_ACCOUNTS  = "failed list bank accounts"
	MESSAGE_FAILED_GET_BANK_ACCOUNT    = "failed get bank account"
	MESSAGE_SUCCESS_LIST_BANK_ACCOUNTS = "success list bank accounts"
	MESSAGE_SUCCESS_GET_BANK_ACCOUNT   = "success get bank account"
)

type (
	CreateBankAccountRequest struct {
		Name              string  `json:"name" validate:"required"`
		DateHeader        string  `json:"dateHeader" validate:"required"`
		DescriptionHeader string  `json:"descriptionHeader" validate:"required"`
		AmountExpression  string  `json:"amountExpression" validate:"required"`
		StartingAmount    int64   `json:"startingAmount"` // TODO: Validate this is 2 decimal number
		LoginURL          *string `json:"loginUrl"`
	}

	BankAccountResponse struct {
		ID                uint   `json:"id"`
		Name              string `json:"name"`
		DateHeader        string `json:"dateHeader"`
		DescriptionHeader string `json:"descriptionHeader"`
		AmountExpression  string `json:"amountExpression"`
		StartingAmount    int64  `json:"startingAmount"`
		Balance           int64  `json:"balance"`
		Color             string `json:"color"`
		LoginURL          string `json:"loginUrl"`
	}
)
