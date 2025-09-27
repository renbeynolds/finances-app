package response

type CategoryResponse struct {
	Id             int    `json:"id"`
	Name           string `json:"name"`
	Color          string `json:"color,omitempty"`
	IconURL        string `json:"iconUrl,omitempty"`
	Type           string `json:"type"`
	ParentCategory *int   `json:"parentCategory,omitempty"`
}
