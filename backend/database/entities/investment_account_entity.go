package entities

import (
	"gorm.io/gorm"
)

type InvestmentAccount struct {
	gorm.Model
	Name                 string  `gorm:"unique;not null;default:null"`
	Balance              int64   `gorm:"not null;default:0"`
	IncludeInRetirement  bool    `gorm:"not null;default:false"`
	AnnualContribution   int64   `gorm:"not null;default:0"`
	ExpectedAnnualReturn float64 `gorm:"not null;default:0"`
	AccountType          string  `gorm:"not null;default:'TAXABLE'"`
	Balances             []InvestmentAccountBalance
}
