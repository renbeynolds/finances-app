package router

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/controller"
	"github.com/webstradev/gin-pagination/v2/pkg/pagination"
)

var paginator = pagination.New(
	pagination.WithPageText("page"),
	pagination.WithSizeText("limit"),
	pagination.WithDefaultPageSize(10),
	pagination.WithMinPageSize(1),
	pagination.WithMaxPageSize(100),
)

func NewRouter(
	healthController controller.HealthController,
	accountController controller.AccountController,
	uploadController controller.UploadController,
	categoryController controller.CategoryController,
	transactionController controller.TransactionController,
	insightController controller.InsightController,
	investmentAccountController controller.InvestmentAccountController,
) *gin.Engine {
	router := gin.Default()

	apiGroup := router.Group("/api")
	{
		healthGroup := apiGroup.Group("/health")
		{
			healthGroup.GET("/", healthController.Health)
		}

		accountsGroup := apiGroup.Group("/accounts")
		{
			accountsGroup.POST("/", accountController.Create)
			accountsGroup.GET("/", accountController.FindAll)
			accountGroup := accountsGroup.Group("/:accountId")
			{
				accountGroup.GET("/", accountController.FindByID)
				accountGroup.PATCH("/", accountController.Update)
				accountGroup.GET("/balance_over_time", accountController.GetBalanceOverTime)
			}
		}

		investmentAccountsGroup := apiGroup.Group("/investment_accounts")
		{
			investmentAccountsGroup.POST("/", investmentAccountController.Create)
			investmentAccountsGroup.GET("/", investmentAccountController.FindAll)
			investmentAccountGroup := investmentAccountsGroup.Group("/:accountId")
			{
				investmentAccountGroup.GET("/", investmentAccountController.FindByID)
				investmentAccountGroup.POST("/balance", investmentAccountController.RecordBalance)
			}
		}

		uploadsGroup := apiGroup.Group("/uploads")
		{
			uploadsGroup.GET("/", uploadController.FindAll)
			uploadsGroup.POST("/", uploadController.Create)
		}

		categoriesGroup := apiGroup.Group("/categories")
		{
			categoriesGroup.GET("/", categoryController.FindAll)
		}

		transactionsGroup := apiGroup.Group("/transactions")
		{
			transactionsGroup.GET("/", paginator, transactionController.FindAll)
			transactionsGroup.GET("/total", transactionController.GetFilteredTransactionsTotal)
			transactionsGroup.PATCH("/:transactionId", transactionController.Update)
		}

		insightsGroup := apiGroup.Group("/insights")
		{
			insightsGroup.GET("/top_spending_categories", insightController.GetTopSpendingCategories)
			insightsGroup.GET("/income_vs_average", insightController.GetIncomeVsAverage)
			insightsGroup.GET("/expense_vs_average", insightController.GetExpenseVsAverage)
			insightsGroup.GET("/income_vs_expense", insightController.GetIncomeVsExpense)
			insightsGroup.GET("/net_worth", insightController.GetNetWorth)
		}
	}

	return router
}
