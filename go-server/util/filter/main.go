package filter

import "gorm.io/gorm"

func Filter(value interface{}, dateFilter *DateFilter, db *gorm.DB) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("date >= ? AND date <= ?", dateFilter.From, dateFilter.To)
	}
}
