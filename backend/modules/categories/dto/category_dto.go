package dto

const (
	MESSAGE_FAILED_CREATE_CATEGORY  = "failed create category"
	MESSAGE_SUCCESS_CREATE_CATEGORY = "success create category"

	MESSAGE_FAILED_LIST_CATEGORIES  = "failed list categories"
	MESSAGE_SUCCESS_LIST_CATEGORIES = "success list categories"
)

type (
	CreateCategoryRequest struct {
		Name             string  `json:"name" validate:"required"`
		Color            *string `json:"color"`
		IconURL          *string `json:"iconUrl"`
		Type             string  `json:"type" validate:"required,oneof=income expense"`
		ParentCategoryID *uint   `json:"parentCategoryId"`
	}

	CategoryResponse struct {
		ID               uint   `json:"id"`
		Name             string `json:"name"`
		Color            string `json:"color"`
		IconURL          string `json:"iconUrl"`
		Type             string `json:"type"`
		ParentCategoryID *uint  `json:"parentCategoryId"`
	}
)
