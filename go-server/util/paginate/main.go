package paginate

import (
	"math"

	"gorm.io/gorm"
)

type Pagination struct {
	Limit int
	Page  int
	TotalPages int
}

func (p *Pagination) GetOffset() int {  
	return (p.Page - 1) * p.Limit 
} 

func Paginate(value interface{}, pagination *Pagination, db *gorm.DB) func(db *gorm.DB) *gorm.DB {  
	var totalRows int64 
	db.Model(value).Count(&totalRows)

	// pagination.TotalRows = totalRows    
	totalPages := int(math.Ceil(float64(totalRows) / float64(pagination.Limit)))    
	pagination.TotalPages = totalPages

	return func(db *gorm.DB) *gorm.DB { 
			return db.Offset(pagination.GetOffset()).Limit(pagination.Limit)
	}   
} 