package model

import (
	"gorm.io/gorm"
)

type Category struct {
  gorm.Model
	Name string `gorm:"unique"`
	Color *string // nullable
	IconURL *string // nullable
	Transactions []Transaction
	Type string
	ParentCategoryID *uint
  SubCategories      []Category `gorm:"foreignkey:ParentCategoryID"`
	PrefixRules []PrefixRule
}