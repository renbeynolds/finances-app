package providers

import (
	"github.com/renbeynolds/finances-app/database"
	bankAccountController "github.com/renbeynolds/finances-app/modules/banking/controller"
	bankAccountRepository "github.com/renbeynolds/finances-app/modules/banking/repository"
	bankAccountService "github.com/renbeynolds/finances-app/modules/banking/service"
	budgetController "github.com/renbeynolds/finances-app/modules/budgets/controller"
	budgetRepository "github.com/renbeynolds/finances-app/modules/budgets/repository"
	budgetService "github.com/renbeynolds/finances-app/modules/budgets/service"
	categoryController "github.com/renbeynolds/finances-app/modules/categories/controller"
	categoryRepository "github.com/renbeynolds/finances-app/modules/categories/repository"
	categoryService "github.com/renbeynolds/finances-app/modules/categories/service"
	investmentBalanceController "github.com/renbeynolds/finances-app/modules/investmentbalance/controller"
	investmentBalanceRepository "github.com/renbeynolds/finances-app/modules/investmentbalance/repository"
	investmentBalanceService "github.com/renbeynolds/finances-app/modules/investmentbalance/service"
	investmentAccountController "github.com/renbeynolds/finances-app/modules/investments/controller"
	investmentAccountRepository "github.com/renbeynolds/finances-app/modules/investments/repository"
	investmentAccountService "github.com/renbeynolds/finances-app/modules/investments/service"
	snapshotController "github.com/renbeynolds/finances-app/modules/snapshot/controller"
	snapshotRepository "github.com/renbeynolds/finances-app/modules/snapshot/repository"
	snapshotService "github.com/renbeynolds/finances-app/modules/snapshot/service"
	transactionController "github.com/renbeynolds/finances-app/modules/transactions/controller"
	transactionRepository "github.com/renbeynolds/finances-app/modules/transactions/repository"
	transactionService "github.com/renbeynolds/finances-app/modules/transactions/service"
	trendsController "github.com/renbeynolds/finances-app/modules/trends/controller"
	trendsRepository "github.com/renbeynolds/finances-app/modules/trends/repository"
	trendsService "github.com/renbeynolds/finances-app/modules/trends/service"
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

	budgetRepository := budgetRepository.NewBudgetRepository(db)
	budgetService := budgetService.NewBudgetService(budgetRepository, db)

	categoryRepository := categoryRepository.NewCategoryRepository(db)
	categoryService := categoryService.NewCategoryService(categoryRepository, db)

	transactionRepository := transactionRepository.NewTransactionRepository(db)
	transactionService := transactionService.NewTransactionService(transactionRepository, db)

	investmentAccountRepository := investmentAccountRepository.NewInvestmentAccountRepository(db)
	investmentAccountService := investmentAccountService.NewInvestmentAccountService(investmentAccountRepository, db)

	investmentBalanceRepository := investmentBalanceRepository.NewInvestmentBalanceRepository(db)
	investmentBalanceService := investmentBalanceService.NewInvestmentBalanceService(investmentBalanceRepository, investmentAccountRepository, db)

	uploadRepository := uploadRepository.NewUploadRepository(db)
	uploadService := uploadService.NewUploadService(uploadRepository, bankAccountRepository, categoryRepository, transactionRepository, db)

	snapshotRepository := snapshotRepository.NewSnapshotRepository(db)
	snapshotService := snapshotService.NewSnapshotService(snapshotRepository, db)

	trendsRepository := trendsRepository.NewTrendsRepository(db)
	trendsService := trendsService.NewTrendsService(trendsRepository, db)

	do.Provide(
		injector, func(i do.Injector) (bankAccountController.BankAccountController, error) {
			return bankAccountController.NewBankAccountController(i, bankAccountService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (budgetController.BudgetController, error) {
			return budgetController.NewBudgetController(i, budgetService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (investmentAccountController.InvestmentAccountController, error) {
			return investmentAccountController.NewInvestmentAccountController(i, investmentAccountService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (investmentBalanceController.InvestmentBalanceController, error) {
			return investmentBalanceController.NewInvestmentBalanceController(i, investmentBalanceService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (uploadController.UploadController, error) {
			return uploadController.NewUploadController(i, uploadService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (categoryController.CategoryController, error) {
			return categoryController.NewCategoryController(i, categoryService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (transactionController.TransactionController, error) {
			return transactionController.NewTransactionController(i, transactionService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (snapshotController.SnapshotController, error) {
			return snapshotController.NewSnapshotController(i, snapshotService), nil
		},
	)
	do.Provide(
		injector, func(i do.Injector) (trendsController.TrendsController, error) {
			return trendsController.NewTrendsController(i, trendsService), nil
		},
	)
}
