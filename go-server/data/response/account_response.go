package response

type AccountResponse struct {
	Id                int    `json:"id"`
	Name              string `json:"name"`
	DateHeader        string `json:"dateHeader"`
	DescriptionHeader string `json:"descriptionHeader"`
	AmountHeader      string `json:"amountHeader"`
	StartingAmount    int64  `json:"startingAmount"`
	Balance           int64  `json:"balance"`
	AmountsType       string `json:"amountsType"`
	Color             string `json:"color"`
}
