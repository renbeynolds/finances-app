package dto

const (
	MESSAGE_FAILED_GET_INCOME_VS_EXPENSE  = "Failed to get income vs expense data"
	MESSAGE_SUCCESS_GET_INCOME_VS_EXPENSE = "Income vs expense data retrieved successfully"

	MESSAGE_FAILED_GET_NET_WORTH_OVER_TIME  = "Failed to get net worth over time data"
	MESSAGE_SUCCESS_GET_NET_WORTH_OVER_TIME = "Net worth over time data retrieved successfully"

	MESSAGE_FAILED_GET_CURRENT_NET_WORTH  = "Failed to get current net worth"
	MESSAGE_SUCCESS_GET_CURRENT_NET_WORTH = "Current net worth retrieved successfully"

	MESSAGE_FAILED_GET_EXPENSES_OVER_TIME  = "Failed to get expenses over time data"
	MESSAGE_SUCCESS_GET_EXPENSES_OVER_TIME = "Expenses over time data retrieved successfully"
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

type CurrentNetWorthResponse struct {
	Amount float64 `json:"amount"`
	Date   string  `json:"date"`
}

type ExpensesOverTimeResponse struct {
	Day    int     `json:"day"`
	Amount float64 `json:"amount"`
}
