package model

import (
	"time"

	"gorm.io/gorm"
)

type InvestmentAccountBalance struct {
	gorm.Model
	InvestmentAccountID uint      `gorm:"not null"`
	Date                time.Time `gorm:"type:DATE; not null"`
	Balance             int64     `gorm:"not null"`
}
