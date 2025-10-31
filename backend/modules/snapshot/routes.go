package snapshot

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/snapshot/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	snapshotController := do.MustInvoke[controller.SnapshotController](injector)

	snapshotRoutes := server.Group("/api/snapshot")
	{
		snapshotRoutes.GET("/income_vs_average", snapshotController.GetIncomeVsAverage)
		snapshotRoutes.GET("/expense_vs_average", snapshotController.GetExpenseVsAverage)
	}
}
