package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/repository"
)

type UploadServiceImpl struct {
	UploadRepository repository.UploadRepository
	Validate *validator.Validate
}

func NewUploadServiceImpl(uploadRepository repository.UploadRepository) UploadService {
	return &UploadServiceImpl{
		UploadRepository: uploadRepository,
	}
}

func (t *UploadServiceImpl) FindAll() []response.UploadResponse {
	result := t.UploadRepository.FindAll()

	var uploads []response.UploadResponse
	for _, value := range result {
		upload := response.UploadResponse{
			Id:   int(value.ID),
		}
		uploads = append(uploads, upload)
	}

	return uploads
}