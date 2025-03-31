package model

import (
	"gorm.io/gorm"
)

type InvestmentAccount struct {
	gorm.Model
	Name     string `gorm:"unique;not null;default:null"`
	Balance  int64  `gorm:"not null;default:0"`
	Balances []InvestmentAccountBalance
}
