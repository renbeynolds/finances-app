package dto

import (
	"strings"
	"time"
)

const (
	MESSAGE_FAILED_CREATE_INVESTMENT_BALANCE  = "failed create investment balance"
	MESSAGE_SUCCESS_CREATE_INVESTMENT_BALANCE = "success create investment balance"
)

// DateOnly is a custom type for handling YYYY-MM-DD date format
type DateOnly struct {
	time.Time
}

// UnmarshalJSON implements json.Unmarshaler for DateOnly
func (d *DateOnly) UnmarshalJSON(data []byte) error {
	// Remove quotes from the JSON string
	dateStr := strings.Trim(string(data), `"`)

	// Parse the date in YYYY-MM-DD format
	parsedTime, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return err
	}

	d.Time = parsedTime
	return nil
}

// MarshalJSON implements json.Marshaler for DateOnly
func (d DateOnly) MarshalJSON() ([]byte, error) {
	return []byte(`"` + d.Time.Format("2006-01-02") + `"`), nil
}

type (
	CreateInvestmentBalanceRequest struct {
		InvestmentAccountID uint     `json:"investmentAccountId" validate:"required"`
		Balance             int64    `json:"balance" validate:"required"`
		Date                DateOnly `json:"date" validate:"required"`
	}

	InvestmentBalanceResponse struct {
		ID                  uint     `json:"id"`
		InvestmentAccountID uint     `json:"investmentAccountId"`
		Balance             int64    `json:"balance"`
		Date                DateOnly `json:"date"`
		CreatedAt           string   `json:"createdAt"`
		UpdatedAt           string   `json:"updatedAt"`
	}
)
