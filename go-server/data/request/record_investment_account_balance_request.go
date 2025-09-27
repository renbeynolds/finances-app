package request

type RecordInvestmentAccountBalanceRequest struct {
	Date    string `json:"date"`
	Balance string `json:"balance"`
}
