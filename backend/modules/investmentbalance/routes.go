package investmentbalance

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/investmentbalance/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	investmentBalanceController := do.MustInvoke[controller.InvestmentBalanceController](injector)

	investmentBalanceRoutes := server.Group("/api/investment_balances")
	{
		investmentBalanceRoutes.POST("", investmentBalanceController.CreateInvestmentBalance)
	}
}
