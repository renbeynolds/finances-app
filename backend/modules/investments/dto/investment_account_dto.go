package dto

const (
	MESSAGE_FAILED_CREATE_INVESTMENT_ACCOUNT  = "failed create investment account"
	MESSAGE_SUCCESS_CREATE_INVESTMENT_ACCOUNT = "success create investment account"

	MESSAGE_FAILED_LIST_INVESTMENT_ACCOUNTS  = "failed list investment accounts"
	MESSAGE_SUCCESS_LIST_INVESTMENT_ACCOUNTS = "success list investment accounts"

	MESSAGE_FAILED_GET_INVESTMENT_ACCOUNT  = "failed get investment account"
	MESSAGE_SUCCESS_GET_INVESTMENT_ACCOUNT = "success get investment account"

	MESSAGE_FAILED_UPDATE_INVESTMENT_ACCOUNT  = "failed update investment account"
	MESSAGE_SUCCESS_UPDATE_INVESTMENT_ACCOUNT = "success update investment account"

	MESSAGE_FAILED_GET_BALANCE_OVER_TIME  = "failed get balance over time"
	MESSAGE_SUCCESS_GET_BALANCE_OVER_TIME = "success get balance over time"
)

type (
	CreateInvestmentAccountRequest struct {
		Name             string  `json:"name" validate:"required"`
		AccountType      string  `json:"accountType" validate:"required"`
		AnnualVolatility float64 `json:"annualVolatility" validate:"required"`
	}

	UpdateInvestmentAccountRequest struct {
		Name                 *string  `json:"name"`
		IncludeInRetirement  *bool    `json:"includeInRetirement"`
		AnnualContribution   *int64   `json:"annualContribution"`
		ExpectedAnnualReturn *float64 `json:"expectedAnnualReturn"`
		AnnualVolatility     *float64 `json:"annualVolatility"`
		AccountType          *string  `json:"accountType"`
	}

	InvestmentAccountResponse struct {
		ID                   uint    `json:"id"`
		Name                 string  `json:"name"`
		Balance              int64   `json:"balance"`
		UpdatedAt            string  `json:"updatedAt"`
		IncludeInRetirement  bool    `json:"includeInRetirement"`
		AnnualContribution   int64   `json:"annualContribution"`
		ExpectedAnnualReturn float64 `json:"expectedAnnualReturn"`
		AnnualVolatility     float64 `json:"annualVolatility"`
		AccountType          string  `json:"accountType"`
	}

	BalanceOverTimeResponse struct {
		Date   string `json:"date"`
		Amount int64  `json:"amount"`
	}
)
