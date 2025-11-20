package dto

const (
	MESSAGE_FAILED_GET_INCOME_VS_AVERAGE  = "Failed to get income vs average"
	MESSAGE_SUCCESS_GET_INCOME_VS_AVERAGE = "Successfully got income vs average"

	MESSAGE_FAILED_GET_EXPENSE_VS_AVERAGE  = "Failed to get expense vs average"
	MESSAGE_SUCCESS_GET_EXPENSE_VS_AVERAGE = "Successfully got expense vs average"
)

type (
	AmountVsAverageResponse struct {
		Amount  int64 `json:"amount"`
		Average int64 `json:"average"`
		Median  int64 `json:"median"`
	}
)
