package query

type TopSpendingCategoriesQuery struct {
	From *string `form:"from"`
	To   *string `form:"to"`
}
