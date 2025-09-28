package providers

import (
	"github.com/renbeynolds/finances-app/config"
	bankAccountController "github.com/renbeynolds/finances-app/modules/banking/controller"
	bankAccountRepository "github.com/renbeynolds/finances-app/modules/banking/repository"
	bankAccountService "github.com/renbeynolds/finances-app/modules/banking/service"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/samber/do/v2"
	"gorm.io/gorm"
)

func InitDatabase(injector do.Injector) {
	do.ProvideNamed(injector, constants.DB, func(i do.Injector) (*gorm.DB, error) {
		return config.SetupDatabaseConnection(), nil
	})
}

func RegisterDependencies(injector do.Injector) {
	InitDatabase(injector)
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)

	bankAccountRepository := bankAccountRepository.NewBankAccountRepository(db)
	bankAccountService := bankAccountService.NewBankAccountService(bankAccountRepository, db)

	do.Provide(
		injector, func(i do.Injector) (bankAccountController.BankAccountController, error) {
			return bankAccountController.NewBankAccountController(i, bankAccountService), nil
		},
	)
}
