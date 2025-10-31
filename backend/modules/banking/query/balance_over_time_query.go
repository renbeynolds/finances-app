package query

type BalanceOverTimeQuery struct {
	From *string `form:"from"`
	To   *string `form:"to"`
}
