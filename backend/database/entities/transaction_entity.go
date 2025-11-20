package entities

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	UploadID          uint `gorm:"not null"`
	CategoryID        *uint
	Date              time.Time `gorm:"type:DATE; not null"`
	Description       string    `gorm:"not null"`
	Comment           *string
	Amount            int64 `gorm:"not null"`
	Balance           int64 `gorm:"not null"`
	BalanceCorrection int64 `gorm:"not null; default:0"`
}
