package request

type CreateCategoryRequest struct {
	Name     string  `validate:"required,min=1,max=200" json:"name"`
	Color    string  `validate:"min=0,max=7" json:"color"`
	IconURL  *string `json:"iconURL"`
	Type     string  `validate:"required,oneof=expense income" json:"type"`
	ParentID *uint   `json:"parentId"`
}
