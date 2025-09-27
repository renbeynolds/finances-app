package repository

import (
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/util"
	"gorm.io/gorm"
)

type UploadRepositoryImpl struct {
	Db *gorm.DB
}

func NewUploadRepositoryImpl(Db *gorm.DB) UploadRepository {
	return &UploadRepositoryImpl{Db: Db}
}

func (r *UploadRepositoryImpl) Insert(upload model.Upload) model.Upload {
	result := r.Db.Create(&upload)
	util.ErrorPanic(result.Error)
	return upload
}

func (r *UploadRepositoryImpl) FindAll() []model.Upload {
	var uploads []model.Upload
	r.Db.Find(&uploads)
	return uploads
}
