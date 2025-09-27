package response

type TransactionResponse struct {
	Id          int    `json:"id"`
	UploadId    int    `json:"uploadId"`
	CategoryId  uint   `json:"categoryId,omitempty"`
	Date        string `json:"date"`
	Description string `json:"description"`
	Comment     string `json:"comment,omitempty"`
	Amount      int64  `json:"amount"`
	Balance     int64  `json:"balance"`
}
