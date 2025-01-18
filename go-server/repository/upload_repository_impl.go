package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"gorm.io/gorm"
)

type UploadRepositoryImpl struct {
	Db *gorm.DB
}

func NewUploadRepositoryImpl(Db *gorm.DB) UploadRepository {
	return &UploadRepositoryImpl{Db: Db}
}

func (r *UploadRepositoryImpl) FindAll() []model.Upload {
	var Uploads []model.Upload
	r.Db.Find(&Uploads)
	return Uploads
}