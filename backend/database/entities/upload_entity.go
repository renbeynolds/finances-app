package entities

import (
	"gorm.io/gorm"
)

type Upload struct {
	gorm.Model
	BankAccountID uint `gorm:"not null,column:account_id"` // TODO: rename column in DB
	Transactions  []Transaction
}
