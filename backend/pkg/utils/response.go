package utils

type Response[T any] struct {
	Success    bool                `json:"success"`
	Message    string              `json:"message"`
	Error      any                 `json:"error,omitempty"`
	Data       T                   `json:"data,omitempty"`
	Pagination *PaginationResponse `json:"pagination,omitempty"`
}

type PaginationResponse struct {
	TotalRecords int64 `json:"totalRecords"`
}

type EmptyObj struct{}

func BuildResponseSuccess[T any](message string, data T, pagination *Pagination) Response[T] {
	res := Response[T]{
		Success: true,
		Message: message,
		Data:    data,
	}
	if pagination != nil {
		res.Pagination = &PaginationResponse{
			TotalRecords: pagination.TotalRecords,
		}
	}
	return res
}

func BuildResponseFailed(message string, err string) Response[EmptyObj] {
	res := Response[EmptyObj]{
		Success: false,
		Message: message,
		Error:   err,
	}
	return res
}
