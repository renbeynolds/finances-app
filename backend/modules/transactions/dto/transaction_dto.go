package dto

const (
	MESSAGE_FAILED_UPDATE_TRANSACTION  = "failed update transaction"
	MESSAGE_SUCCESS_UPDATE_TRANSACTION = "success update transaction"

	MESSAGE_FAILED_LIST_TRANSACTIONS  = "failed list transactions"
	MESSAGE_SUCCESS_LIST_TRANSACTIONS = "success list transactions"
)

type (
	UpdateTransactionRequest struct {
		CategoryID *uint   `json:"categoryId"`
		Comment    *string `json:"comment"`
	}

	TransactionResponse struct {
		ID          uint   `json:"id"`
		UploadID    uint   `json:"uploadId"`
		CategoryID  *uint  `json:"categoryId"`
		Date        string `json:"date"`
		Description string `json:"description"`
		Comment     string `json:"comment"`
		Amount      int64  `json:"amount"`
		Balance     int64  `json:"balance"`
	}
)
