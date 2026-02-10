package query

type BudgetActualsQuery struct {
	Month string `form:"month" binding:"required"`
}
