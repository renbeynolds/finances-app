package model

import (
	"gorm.io/gorm"
)

type Account struct {
  gorm.Model
	Name string `gorm:"unique;not null"`
	DateHeader string `gorm:"not null"`
	DescriptionHeader string `gorm:"not null"`
	AmountHeader *string
	IncomeHeader *string
	ExpenseHeader *string
	TypeHeader *string
	StartingAmount int64 `gorm:"not null;default:0"`
	Balance int64 `gorm:"not null;default:0"`
	AmountsType string `gorm:"not null"` // TODO: enum?
	Color *string
	Uploads []Upload
}