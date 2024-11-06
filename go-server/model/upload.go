package model

import (
	"gorm.io/gorm"
)

type Upload struct {
  gorm.Model
	AccountID uint
	Transactions []Transaction
}