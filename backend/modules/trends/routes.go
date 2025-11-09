package trends

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/trends/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	trendsController := do.MustInvoke[controller.TrendsController](injector)

	trendsRoutes := server.Group("/api/trends")
	{
		trendsRoutes.GET("/income_vs_expense", trendsController.GetIncomeVsExpense)
		trendsRoutes.GET("/net_worth_over_time", trendsController.GetNetWorthOverTime)
	}
}
