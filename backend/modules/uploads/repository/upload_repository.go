package repository

import (
	"context"

	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/gorm"
)

type (
	UploadRepository interface {
		CreateUpload(ctx context.Context, tx *gorm.DB, upload entities.Upload) (entities.Upload, error)
		GetAllUploads(ctx context.Context, tx *gorm.DB) ([]entities.Upload, error)
	}

	uploadRepository struct {
		db *gorm.DB
	}
)

func NewUploadRepository(db *gorm.DB) UploadRepository {
	return &uploadRepository{
		db: db,
	}
}

func (r *uploadRepository) CreateUpload(ctx context.Context, tx *gorm.DB, upload entities.Upload) (entities.Upload, error) {
	if tx == nil {
		tx = r.db
	}

	if err := tx.WithContext(ctx).Create(&upload).Error; err != nil {
		return entities.Upload{}, err
	}

	return upload, nil
}

func (r *uploadRepository) GetAllUploads(ctx context.Context, tx *gorm.DB) ([]entities.Upload, error) {
	if tx == nil {
		tx = r.db
	}

	var uploads []entities.Upload
	if err := tx.WithContext(ctx).Find(&uploads).Error; err != nil {
		return nil, err
	}

	return uploads, nil
}
