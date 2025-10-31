package query

type CategoryAmountOverTimeQuery struct {
	From *string `form:"from"`
	To   *string `form:"to"`
}
