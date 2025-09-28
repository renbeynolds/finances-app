package response

type IncomeVsExpenseResponse struct {
	Month   string `json:"month"`
	Income  int64  `json:"income"`
	Expense int64  `json:"expense"`
	Net     int64  `json:"net"`
}
