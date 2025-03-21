package main

import (
	"embed"

	"github.com/pressly/goose/v3"
	"github.com/renbeynolds/finances-app/controller"
	"github.com/renbeynolds/finances-app/data/validation"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/router"
	"github.com/renbeynolds/finances-app/service"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dsn = "host=localhost user=username password=password dbname=database port=5432 sslmode=disable TimeZone=America/New_York"

//go:embed migrations/*.sql
var embedMigrations embed.FS

func main() {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	goose.SetBaseFS(embedMigrations)
	if err := goose.SetDialect("postgres"); err != nil {
		panic(err)
	}

	rawDB, err := db.DB()
	if err != nil {
		panic(err)
	}
	if err := goose.Up(rawDB, "migrations"); err != nil {
		panic(err)
	}

	validate := validation.NewValidator()

	accountRepository := repository.NewAccountRepositoryImpl(db)
	uploadRepository := repository.NewUploadRepositoryImpl(db)
	categoryRepository := repository.NewCategoryRepositoryImpl(db)
	transactionRepository := repository.NewTransactionRepositoryImpl(db)
	insightRepository := repository.NewInsightRepositoryImpl(db)

	accountService := service.NewAccountServiceImpl(accountRepository)
	uploadService := service.NewUploadServiceImpl(uploadRepository, accountRepository, categoryRepository)
	categoryService := service.NewCategoryServiceImpl(categoryRepository)
	transactionService := service.NewTransactionServiceImpl(transactionRepository)
	insightService := service.NewInsightServiceImpl(insightRepository)

	healthController := controller.NewHealthController()
	insightController := controller.NewInsightControllerImpl(insightService, validate)
	accountController := controller.NewAccountControllerImpl(accountService, validate)
	uploadController := controller.NewUploadControllerImpl(uploadService, validate)
	categoryController := controller.NewCategoryControllerImpl(categoryService, validate)
	transactionController := controller.NewTransactionControllerImpl(transactionService, validate)

	router := router.NewRouter(*healthController, accountController, uploadController, categoryController, transactionController, insightController)

	router.Run(":8080")
}
