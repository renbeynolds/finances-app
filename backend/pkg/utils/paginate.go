package utils

import "gorm.io/gorm"

type Pagination struct {
	Limit        int `form:"limit,default=10" binding:"min=1,max=100"`
	Page         int `form:"page,default=1" binding:"min=1"`
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
