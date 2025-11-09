package query

type IncomeVsExpenseQuery struct {
	From *string `form:"from" binding:"required"`
	To   *string `form:"to" binding:"required"`
}

type NetWorthOverTimeQuery struct {
	From *string `form:"from" binding:"required"`
	To   *string `form:"to" binding:"required"`
}
