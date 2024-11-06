package main

import (
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/controller"
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/router"
	"github.com/renbeynolds/finances-app/service"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dsn = "host=localhost user=username password=password dbname=database port=5432 sslmode=disable TimeZone=America/New_York"

func main() {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
    panic("failed to connect database")
  }

	validate := validator.New()

	db.AutoMigrate(&model.Account{})
	db.AutoMigrate(&model.Upload{})
	db.AutoMigrate(&model.Category{})
	db.AutoMigrate(&model.Transaction{})
	db.AutoMigrate(&model.PrefixRule{})

	accountRepository := repository.NewAccountRepositoryImpl(db)

	accountService := service.NewAccountServiceImpl(accountRepository, validate)

	healthController := controller.NewHealthController()
	accountController := controller.NewAccountController(accountService)

	router := router.NewRouter(*healthController, *accountController)

 router.Run(":8080")
}