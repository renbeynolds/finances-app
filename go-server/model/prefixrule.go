package model

import (
	"gorm.io/gorm"
)

type PrefixRule struct {
  gorm.Model
	Prefix string
	CategoryID uint
}