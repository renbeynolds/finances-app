package model

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
  gorm.Model
	UploadID uint
	CategoryID uint
	Date time.Time
	Description string
	Comment *string
	Amount int64
	Balance int64
	BalanceCorrection int64 `gorm:"default:0"`
}