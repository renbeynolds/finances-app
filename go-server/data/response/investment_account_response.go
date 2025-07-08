package response

type InvestmentAccountResponse struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Balance   int64  `json:"balance"`
	UpdatedAt string `json:"updatedAt"`
}
