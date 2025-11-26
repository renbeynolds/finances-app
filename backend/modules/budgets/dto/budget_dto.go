package dto

const (
	MESSAGE_FAILED_CREATE_BUDGET  = "failed create budget"
	MESSAGE_SUCCESS_CREATE_BUDGET = "success create budget"

	MESSAGE_FAILED_GET_BUDGET  = "failed get budget"
	MESSAGE_SUCCESS_GET_BUDGET = "success get budget"

	MESSAGE_FAILED_UPDATE_BUDGET  = "failed update budget"
	MESSAGE_SUCCESS_UPDATE_BUDGET = "success update budget"
)

type (
	CreateBudgetRequest struct {
		CategoryID uint `json:"categoryId" validate:"required"`
	}

	UpdateBudgetRequest struct {
		Amount *int64 `json:"amount" validate:"omitempty"`
	}

	BudgetResponse struct {
		ID         uint  `json:"id"`
		Amount     int64 `json:"amount"`
		CategoryID uint  `json:"categoryId"`
	}
)
