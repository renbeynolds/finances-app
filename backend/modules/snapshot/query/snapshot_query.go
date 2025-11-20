package query

type AmountVsAverageQuery struct {
	From    *string `form:"from"`
	To      *string `form:"to"`
	AvgFrom *string `form:"avg_from"`
	AvgTo   *string `form:"avg_to"`
}
