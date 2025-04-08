package service

import (
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
)

type UploadService interface {
	FindAll() []response.UploadResponse
	Create(upload request.CreateUploadRequest) (*response.UploadResponse, error)
}
