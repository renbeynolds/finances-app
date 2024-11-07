package model

import (
	"gorm.io/gorm"
)

type Category struct {
  gorm.Model
	Name string `gorm:"unique;not null"`
	Color *string
	IconURL *string
	Transactions []Transaction
	Type string `gorm:"default:expense;not null"`
	ParentCategoryID *uint
  SubCategories      []Category `gorm:"foreignkey:ParentCategoryID"`
	PrefixRules []PrefixRule
}