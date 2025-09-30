package investments

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/investments/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	investmentAccountController := do.MustInvoke[controller.InvestmentAccountController](injector)

	investmentAccountRoutes := server.Group("/api/investment_accounts")
	{
		investmentAccountRoutes.POST("", investmentAccountController.CreateInvestmentAccount)
		investmentAccountRoutes.GET("", investmentAccountController.GetAllInvestmentAccounts)
		investmentAccountRoutes.GET("/:id", investmentAccountController.GetInvestmentAccountByID)
		investmentAccountRoutes.PATCH("/:id", investmentAccountController.UpdateInvestmentAccount)
	}
}
