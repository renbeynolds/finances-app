package main

import (
	"github.com/renbeynolds/finances-app/controller"
	"github.com/renbeynolds/finances-app/data/validation"
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

	validate := validation.NewValidator()

	db.AutoMigrate(&model.Account{})
	db.AutoMigrate(&model.Upload{})
	db.AutoMigrate(&model.Category{})
	db.AutoMigrate(&model.Transaction{})
	db.AutoMigrate(&model.PrefixRule{})

	accountRepository := repository.NewAccountRepositoryImpl(db)
	uploadRepository := repository.NewUploadRepositoryImpl(db)

	accountService := service.NewAccountServiceImpl(accountRepository)
	uploadService := service.NewUploadServiceImpl(uploadRepository)

	healthController := controller.NewHealthController()
	accountController := controller.NewAccountControllerImpl(accountService, validate)
	uploadController := controller.NewUploadControllerImpl(uploadService, validate)

	router := router.NewRouter(*healthController, accountController, uploadController)

 router.Run(":8080")
}