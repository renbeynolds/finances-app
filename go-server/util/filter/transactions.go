package filter

import (
	"strconv"

	"gorm.io/gorm"
)

type TransactionFilters struct {
	From        string
	To          string
	Description string
	Min         string
	Max         string
	Comment     string
	AccountID   string
	UploadID    string
}

func FilterTransactions(value interface{}, filters *TransactionFilters, db *gorm.DB) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		filtered := db.Debug()
		if filters.From != "" && filters.To != "" {
			filtered = db.Where("date >= ? AND date <= ?", filters.From, filters.To)
		}
		if filters.Description != "" {
			filtered = filtered.Where("description % ?", filters.Description)
		}
		if filters.Comment != "" {
			filtered = filtered.Where("comment % ?", filters.Comment)
		}
		if filters.Min != "" {
			minAmount, err := strconv.Atoi(filters.Min)
			if err != nil {
				// TODO
			}
			filtered = filtered.Where("amount >= ?", minAmount*100)
		}
		if filters.Max != "" {
			maxAmount, err := strconv.Atoi(filters.Max)
			if err != nil {
				// TODO
			}
			filtered = filtered.Where("amount <= ?", maxAmount*100)
		}
		if filters.UploadID != "" {
			filtered = filtered.Where("upload_id = ?", filters.UploadID)
		}
		if filters.AccountID != "" {
			filtered = filtered.Joins("LEFT JOIN uploads u ON transactions.upload_id = u.id")
			filtered = filtered.Where("u.account_id = ?", filters.AccountID)
		}
		return filtered
	}
}
