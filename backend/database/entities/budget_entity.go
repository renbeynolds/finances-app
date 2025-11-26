package entities

import (
	"gorm.io/gorm"
)

type Budget struct {
	gorm.Model
	Amount     int64    `gorm:"not null"`
	CategoryID uint     `gorm:"not null"`
	Category   Category `gorm:"foreignKey:CategoryID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
