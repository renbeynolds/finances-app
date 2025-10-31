package query

type IncomeVsExpenseQuery struct {
	From *string `form:"from" binding:"required"`
	To   *string `form:"to" binding:"required"`
}

type NetWorthQuery struct {
	From *string `form:"from" binding:"required"`
	To   *string `form:"to" binding:"required"`
}
