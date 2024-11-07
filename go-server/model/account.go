package model

import (
	"gorm.io/gorm"
)

const (
	// A negative value in the amount column indicates an expense
	NegativeAmountExpense = "negamtexp"

	// A positive value in the amount column indicates an expense
  PositiveAmountExpense = "posamtexp"

	// There is a separate column specifying whether the amount is income or expense
  SeparateTypeColumn = "septypecol"

	// There are separate columns for income vs expense
  SeparateIncomeExpenseColumns = "sepincexp"
)

type Account struct {
  gorm.Model
	Name string `gorm:"unique;not null;default:null"`
	DateHeader string `gorm:"not null;default:null"`
	DescriptionHeader string `gorm:"not null;default:null"`
	AmountHeader *string 
	IncomeHeader *string
	ExpenseHeader *string
	TypeHeader *string
	StartingAmount int64 `gorm:"not null;default:0"`
	Balance int64 `gorm:"not null;default:0"`
	AmountsType string `gorm:"not null;default null"` // TODO: can this be an enum
	Color *string
	Uploads []Upload
}