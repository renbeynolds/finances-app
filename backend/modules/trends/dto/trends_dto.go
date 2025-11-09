package dto

const (
	MESSAGE_FAILED_GET_INCOME_VS_EXPENSE  = "Failed to get income vs expense data"
	MESSAGE_SUCCESS_GET_INCOME_VS_EXPENSE = "Income vs expense data retrieved successfully"

	MESSAGE_FAILED_GET_NET_WORTH_OVER_TIME  = "Failed to get net worth over time data"
	MESSAGE_SUCCESS_GET_NET_WORTH_OVER_TIME = "Net worth over time data retrieved successfully"
)

type IncomeVsExpenseResponse struct {
	Month   string  `json:"month"`
	Income  float64 `json:"income"`
	Expense float64 `json:"expense"`
	Net     float64 `json:"net"`
}

type NetWorthOverTimeResponse struct {
	Date   string  `json:"date"`
	Amount float64 `json:"amount"`
}
