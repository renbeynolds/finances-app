package transactions

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/transactions/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	transactionController := do.MustInvoke[controller.TransactionController](injector)

	transactionRoutes := server.Group("/api/transactions")
	{
		transactionRoutes.GET("/", transactionController.GetAllTransactions)
		transactionRoutes.GET("/total", transactionController.GetFilteredTransactionsTotal)
		transactionRoutes.PATCH("/:id", transactionController.UpdateTransaction)
	}
}
