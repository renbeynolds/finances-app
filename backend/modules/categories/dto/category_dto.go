package dto

const (
	MESSAGE_FAILED_CREATE_CATEGORY  = "failed create category"
	MESSAGE_SUCCESS_CREATE_CATEGORY = "success create category"

	MESSAGE_FAILED_LIST_CATEGORIES  = "failed list categories"
	MESSAGE_SUCCESS_LIST_CATEGORIES = "success list categories"

	MESSAGE_FAILED_UPDATE_CATEGORY  = "failed update category"
	MESSAGE_SUCCESS_UPDATE_CATEGORY = "success update category"

	MESSAGE_FAILED_LIST_TOP_SPENDING_CATEGORIES  = "failed list top spending categories"
	MESSAGE_SUCCESS_LIST_TOP_SPENDING_CATEGORIES = "success list top spending categories"

	MESSAGE_FAILED_GET_CATEGORY_AMOUNT_OVER_TIME  = "failed get category amount over time"
	MESSAGE_SUCCESS_GET_CATEGORY_AMOUNT_OVER_TIME = "success get category amount over time"
)

type (
	CreateCategoryRequest struct {
		Name             string  `json:"name" validate:"required"`
		Color            *string `json:"color"`
		Emoji            *string `json:"emoji"`
		Type             string  `json:"type" validate:"required,oneof=income expense transfer"`
		ParentCategoryID *uint   `json:"parentCategoryId"`
	}

	UpdateCategoryRequest struct {
		Name             *string `json:"name"`
		Color            *string `json:"color"`
		Emoji            *string `json:"emoji"`
		Type             *string `json:"type" validate:"omitempty,oneof=income expense transfer"`
		ParentCategoryID *uint   `json:"parentCategoryId"`
		Budget           *int64  `json:"budget"`
	}

	CategoryResponse struct {
		ID               uint   `json:"id"`
		Name             string `json:"name"`
		Color            string `json:"color"`
		Emoji            string `json:"emoji"`
		Type             string `json:"type"`
		ParentCategoryID *uint  `json:"parentCategoryId"`
		Budget           *int64 `json:"budget"`
	}

	TopSpendingCategoryResponse struct {
		ID    uint    `json:"id"`
		Name  string  `json:"name"`
		Total float64 `json:"total"`
	}

	CategoryAmountOverTimeResponse struct {
		Date   string  `json:"date"`
		Amount float64 `json:"amount"`
	}
)
