package request

type UpdateTransactionRequest struct {
	ID         uint
	CategoryID *uint   `json:"categoryId"`
	Comment    *string `json:"comment"`
}
