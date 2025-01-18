package service

import (
	"github.com/renbeynolds/finances-app/data/response"
)

type UploadService interface {
	FindAll() []response.UploadResponse
}