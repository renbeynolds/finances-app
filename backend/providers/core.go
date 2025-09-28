package providers

import (
	"github.com/renbeynolds/finances-app/database"
	bankAccountController "github.com/renbeynolds/finances-app/modules/banking/controller"
	bankAccountRepository "github.com/renbeynolds/finances-app/modules/banking/repository"
	bankAccountService "github.com/renbeynolds/finances-app/modules/banking/service"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/samber/do/v2"
	"gorm.io/gorm"
)

func InitDatabase(injector do.Injector, dbType string) {
	do.ProvideNamed(injector, constants.DB, func(i do.Injector) (*gorm.DB, error) {
		return database.SetupDatabaseConnection(dbType), nil
	})
}

func RegisterDependencies(injector do.Injector, dbType string) {
	InitDatabase(injector, dbType)
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)

	bankAccountRepository := bankAccountRepository.NewBankAccountRepository(db)
	bankAccountService := bankAccountService.NewBankAccountService(bankAccountRepository, db)

	do.Provide(
		injector, func(i do.Injector) (bankAccountController.BankAccountController, error) {
			return bankAccountController.NewBankAccountController(i, bankAccountService), nil
		},
	)
}
