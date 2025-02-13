package filter

import "gorm.io/gorm"

type TransactionFilters struct {
	From        string
	To          string
	Description string
}

func FilterTransactions(value interface{}, filters *TransactionFilters, db *gorm.DB) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		filtered := db.Debug().Where("date >= ? AND date <= ?", filters.From, filters.To)
		if filters.Description != "" {
			filtered = filtered.Where("description % ?", filters.Description)
		}
		return filtered
	}
}
