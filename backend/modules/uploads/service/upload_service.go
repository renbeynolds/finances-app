package service

import (
	"context"
	"time"

	"github.com/renbeynolds/finances-app/database/entities"
	"github.com/renbeynolds/finances-app/modules/uploads/dto"
	"github.com/renbeynolds/finances-app/modules/uploads/repository"
	"gorm.io/gorm"
)

type UploadService interface {
	CreateUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.UploadResponse, error)
	GetAllUploads(ctx context.Context) ([]dto.UploadResponse, error)
}

type uploadService struct {
	uploadRepository repository.UploadRepository
	db               *gorm.DB
}

func NewUploadService(
	uploadRepo repository.UploadRepository,
	db *gorm.DB,
) UploadService {
	return &uploadService{
		uploadRepository: uploadRepo,
		db:               db,
	}
}

func (s *uploadService) CreateUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.UploadResponse, error) {
	upload := entities.Upload{
		BankAccountID: req.BankAccountID,
	}

	// TODO: Process CSV and create transactions

	createdUpload, err := s.uploadRepository.CreateUpload(ctx, s.db, upload)
	if err != nil {
		return dto.UploadResponse{}, err
	}

	return entityToResponse(createdUpload), nil
}

func (s *uploadService) GetAllUploads(ctx context.Context) ([]dto.UploadResponse, error) {
	uploads, err := s.uploadRepository.GetAllUploads(ctx, s.db)
	if err != nil {
		return nil, err
	}

	var uploadResponses []dto.UploadResponse
	for _, upload := range uploads {
		uploadResponses = append(uploadResponses, entityToResponse(upload))
	}

	return uploadResponses, nil
}

func entityToResponse(upload entities.Upload) dto.UploadResponse {
	return dto.UploadResponse{
		ID:        upload.ID,
		CreatedAt: upload.CreatedAt.Format(time.RFC3339),
	}
}
