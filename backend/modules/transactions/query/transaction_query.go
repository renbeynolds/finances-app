package query

import (
	"strconv"

	"gorm.io/gorm"
)

type TransactionQuery struct {
	From        *string `form:"from"`
	To          *string `form:"to"`
	Description *string `form:"description"`
	Min         *string `form:"min"`
	Max         *string `form:"max"`
	Comment     *string `form:"comment"`
	AccountID   *string `form:"account_id"`
	UploadID    *string `form:"upload_id"`
	CategoryID  *string `form:"category_id"`
}

func QueryTransactions(value interface{}, query *TransactionQuery, db *gorm.DB) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		filtered := db.Debug()
		if query.From != nil && query.To != nil {
			filtered = db.Where("date >= ? AND date <= ?", *query.From, *query.To)
		}
		if query.Description != nil {
			filtered = filtered.Where("description % ?", *query.Description)
		}
		if query.Comment != nil {
			filtered = filtered.Where("comment % ?", *query.Comment)
		}
		if query.Min != nil {
			minAmount, err := strconv.Atoi(*query.Min)
			if err != nil {
				// TODO
			}
			filtered = filtered.Where("amount >= ?", minAmount*100)
		}
		if query.Max != nil {
			maxAmount, err := strconv.Atoi(*query.Max)
			if err != nil {
				// TODO
			}
			filtered = filtered.Where("amount <= ?", maxAmount*100)
		}
		if query.UploadID != nil {
			filtered = filtered.Where("upload_id = ?", *query.UploadID)
		}
		if query.AccountID != nil {
			filtered = filtered.Joins("LEFT JOIN uploads u ON transactions.upload_id = u.id")
			filtered = filtered.Where("u.account_id = ?", *query.AccountID)
		}
		if query.CategoryID != nil {
			filtered = filtered.Where("category_id = ?", *query.CategoryID)
		}
		return filtered
	}
}
