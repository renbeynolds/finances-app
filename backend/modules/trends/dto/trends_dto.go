package dto

const (
	MESSAGE_FAILED_GET_INCOME_VS_EXPENSE  = "Failed to get income vs expense data"
	MESSAGE_SUCCESS_GET_INCOME_VS_EXPENSE = "Income vs expense data retrieved successfully"

	MESSAGE_FAILED_GET_NET_WORTH  = "Failed to get net worth data"
	MESSAGE_SUCCESS_GET_NET_WORTH = "Net worth data retrieved successfully"
)

type IncomeVsExpenseResponse struct {
	Month   string  `json:"month"`
	Income  float64 `json:"income"`
	Expense float64 `json:"expense"`
	Net     float64 `json:"net"`
}

type NetWorthResponse struct {
	Date   string  `json:"date"`
	Amount float64 `json:"amount"`
}
