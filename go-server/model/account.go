package model

import (
	"gorm.io/gorm"
)

type Account struct {
	gorm.Model
	Name              string `gorm:"unique;not null;default:null"`
	DateHeader        string `gorm:"not null;default:null"`
	DescriptionHeader string `gorm:"not null;default:null"`
	AmountExpression  string `gorm:"not null;default:null"`
	StartingAmount    int64  `gorm:"not null;default:0"`
	Balance           int64  `gorm:"not null;default:0"`
	Color             *string
	LoginURL          *string
	Uploads           []Upload
}
