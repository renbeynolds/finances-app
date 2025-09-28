package utils

type Response[T any] struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
	Error   any    `json:"error,omitempty"`
	Data    T      `json:"data,omitempty"`
	Meta    any    `json:"meta,omitempty"`
}

type EmptyObj struct{}

func BuildResponseSuccess[T any](message string, data T) Response[T] {
	res := Response[T]{
		Status:  true,
		Message: message,
		Data:    data,
	}
	return res
}

func BuildResponseFailed(message string, err string) Response[EmptyObj] {
	res := Response[EmptyObj]{
		Status:  false,
		Message: message,
		Error:   err,
	}
	return res
}
