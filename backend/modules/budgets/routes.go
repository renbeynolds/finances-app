package budgets

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/budgets/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	budgetController := do.MustInvoke[controller.BudgetController](injector)

	budgetRoutes := server.Group("/api/budgets")
	{
		budgetRoutes.POST("", budgetController.CreateBudget)
		budgetRoutes.GET("", budgetController.GetAllBudgets)
		budgetRoutes.GET("/actuals", budgetController.GetBudgetActuals)
		budgetRoutes.GET("/:id", budgetController.GetBudgetByID)
		budgetRoutes.PATCH("/:id", budgetController.UpdateBudget)
	}
}
