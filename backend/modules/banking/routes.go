package banking

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/banking/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	bankAccountController := do.MustInvoke[controller.BankAccountController](injector)

	bankAccountRoutes := server.Group("/api/bank_accounts")
	{
		bankAccountRoutes.POST("", bankAccountController.CreateBankAccount)
		bankAccountRoutes.GET("", bankAccountController.GetAllBankAccounts)
		bankAccountRoutes.GET("/:id", bankAccountController.GetBankAccountByID)
		bankAccountRoutes.PATCH("/:id", bankAccountController.UpdateBankAccount)
		bankAccountRoutes.GET("/:id/balance_over_time", bankAccountController.GetBalanceOverTime)
	}
}
