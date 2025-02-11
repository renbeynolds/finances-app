package paginate

import (
	"gorm.io/gorm"
)

type Pagination struct {
	Limit        int
	Page         int
	TotalRecords int64
}

func (p *Pagination) GetOffset() int {
	return (p.Page - 1) * p.Limit
}

func Paginate(value interface{}, pagination *Pagination, db *gorm.DB, scopes ...func(*gorm.DB) *gorm.DB) func(db *gorm.DB) *gorm.DB {
	var totalRows int64
	db.Model(value).Scopes(scopes...).Count(&totalRows)

	pagination.TotalRecords = totalRows

	return func(db *gorm.DB) *gorm.DB {
		return db.Scopes(scopes...).Offset(pagination.GetOffset()).Limit(pagination.Limit)
	}
}
