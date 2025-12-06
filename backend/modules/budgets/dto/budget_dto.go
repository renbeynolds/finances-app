package dto

const (
	MESSAGE_FAILED_CREATE_BUDGET  = "failed create budget"
	MESSAGE_SUCCESS_CREATE_BUDGET = "success create budget"

	MESSAGE_FAILED_GET_BUDGET  = "failed get budget"
	MESSAGE_SUCCESS_GET_BUDGET = "success get budget"

	MESSAGE_FAILED_UPDATE_BUDGET  = "failed update budget"
	MESSAGE_SUCCESS_UPDATE_BUDGET = "success update budget"

	MESSAGE_FAILED_GET_ALL_BUDGETS  = "failed get all budgets"
	MESSAGE_SUCCESS_GET_ALL_BUDGETS = "success get all budgets"

	MESSAGE_FAILED_GET_BUDGET_ACTUALS  = "failed get budget actuals"
	MESSAGE_SUCCESS_GET_BUDGET_ACTUALS = "success get budget actuals"
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

	BudgetActualResponse struct {
		BudgetID   uint  `json:"budgetId"`
		CategoryID uint  `json:"categoryId"`
		Amount     int64 `json:"amount"`
	}
)
