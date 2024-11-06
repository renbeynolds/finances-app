package model

import (
	"gorm.io/gorm"
)

type Account struct {
  gorm.Model
	Name string `gorm:"unique"`
	DateHeader string
	DescriptionHeader string
	AmountHeader *string // nullable
	IncomeHeader *string // nullable
	ExpenseHeader *string // nullable
	TypeHeader *string // nullable
	StartingAmount int64
	Balance int64
	AmountsType string // TODO: Enum?
	Color *string
	Uploads []Upload
}