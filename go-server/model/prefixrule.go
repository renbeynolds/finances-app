package model

import (
	"gorm.io/gorm"
)

type PrefixRule struct {
  gorm.Model
	Prefix string `gorm:"not null"`
	CategoryID uint `gorm:"not null"`
}