package dto

type IncomeVsExpenseQuery struct {
	From *string `form:"from" binding:"required"`
	To   *string `form:"to" binding:"required"`
}

type IncomeVsExpenseResponse struct {
	Month   string  `json:"month"`
	Income  float64 `json:"income"`
	Expense float64 `json:"expense"`
	Net     float64 `json:"net"`
}
