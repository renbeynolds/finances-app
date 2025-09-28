package repository

import (
	"github.com/renbeynolds/finances-app/model"
)

type UploadRepository interface {
	Insert(upload model.Upload) model.Upload
	FindAll() []model.Upload
}
