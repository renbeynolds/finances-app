package entities

import (
	"gorm.io/gorm"
)

type Upload struct {
	gorm.Model
	BankAccountID uint `gorm:"not null"`
	Transactions  []Transaction
}
