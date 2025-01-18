package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type UploadRepository interface {
	FindAll() []model.Upload
}