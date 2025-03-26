package response

type AccountResponse struct {
	Id                int    `json:"id"`
	Name              string `json:"name"`
	DateHeader        string `json:"dateHeader"`
	DateFormat        string `json:"dateFormat"`
	DescriptionHeader string `json:"descriptionHeader"`
	AmountExpression  string `json:"amountExpression"`
	StartingAmount    int64  `json:"startingAmount"`
	Balance           int64  `json:"balance"`
	Color             string `json:"color"`
	LoginURL          string `json:"loginUrl"`
}
