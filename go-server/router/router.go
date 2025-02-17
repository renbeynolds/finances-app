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
		}

		uploadsGroup := apiGroup.Group("/uploads")
		{
			uploadsGroup.GET("/", uploadController.FindAll)
		}

		categoriesGroup := apiGroup.Group("/categories")
		{
			categoriesGroup.GET("/", categoryController.FindAll)
		}

		transactionsGroup := apiGroup.Group("/transactions")
		{
			transactionsGroup.GET("/", paginator, transactionController.FindAll)
		}

		insightsGroup := apiGroup.Group("/insights")
		{
			insightsGroup.GET("/top_spending_categories", insightController.GetTopSpendingCategories)
			insightsGroup.GET("/income_vs_average", insightController.GetIncomeVsAverage)
		}
	}

	return router
}
