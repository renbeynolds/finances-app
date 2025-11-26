package database

import (
	"embed"

	"github.com/pressly/goose/v3"
	"github.com/renbeynolds/finances-app/database/entities"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

//go:embed migrations/*.sql
var embedMigrations embed.FS

func SetupDatabaseConnection(dbType string) *gorm.DB {
	var db *gorm.DB
	switch dbType {
	case "memory":
		db = setupInMemoryDatabaseConnection()
	default:
		db = setupPostgresDatabaseConnection()
	}

	return db
}

func setupPostgresDatabaseConnection() *gorm.DB {
	var dsn = "host=localhost user=username password=password dbname=database port=5432 sslmode=disable TimeZone=America/New_York"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	goose.SetBaseFS(embedMigrations)

	if err := goose.SetDialect(string(goose.DialectPostgres)); err != nil {
		panic(err)
	}

	rawDB, err := db.DB()
	if err != nil {
		panic(err)
	}

	if err := goose.Up(rawDB, "migrations"); err != nil {
		panic(err)
	}

	return db
}

func setupInMemoryDatabaseConnection() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	if err := db.AutoMigrate(
		&entities.BankAccount{},
		&entities.Budget{},
		&entities.Category{},
		&entities.InvestmentAccountBalance{},
		&entities.InvestmentAccount{},
		&entities.PrefixRule{},
		&entities.Transaction{},
		&entities.Upload{},
	); err != nil {
		panic(err)
	}

	return db
}
