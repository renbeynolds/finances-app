package response

type CategoriesOverTimeResponse struct {
	Date       string `json:"date"`
	CategoryId int    `json:"categoryId"`
	Amount     int64  `json:"amount"`
}
