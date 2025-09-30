package providers

import (
	"github.com/renbeynolds/finances-app/database"
	bankAccountController "github.com/renbeynolds/finances-app/modules/banking/controller"
	bankAccountRepository "github.com/renbeynolds/finances-app/modules/banking/repository"
	bankAccountService "github.com/renbeynolds/finances-app/modules/banking/service"
	investmentAccountController "github.com/renbeynolds/finances-app/modules/investments/controller"
	investmentAccountRepository "github.com/renbeynolds/finances-app/modules/investments/repository"
	investmentAccountService "github.com/renbeynolds/finances-app/modules/investments/service"
	uploadController "github.com/renbeynolds/finances-app/modules/uploads/controller"
	uploadRepository "github.com/renbeynolds/finances-app/modules/uploads/repository"
	uploadService "github.com/renbeynolds/finances-app/modules/uploads/service"
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

	investmentAccountRepository := investmentAccountRepository.NewInvestmentAccountRepository(db)
	investmentAccountService := investmentAccountService.NewInvestmentAccountService(investmentAccountRepository, db)

	uploadRepository := uploadRepository.NewUploadRepository(db)
	uploadService := uploadService.NewUploadService(uploadRepository, db)

	do.Provide(
		injector, func(i do.Injector) (bankAccountController.BankAccountController, error) {
			return bankAccountController.NewBankAccountController(i, bankAccountService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (investmentAccountController.InvestmentAccountController, error) {
			return investmentAccountController.NewInvestmentAccountController(i, investmentAccountService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (uploadController.UploadController, error) {
			return uploadController.NewUploadController(i, uploadService), nil
		},
	)
}
