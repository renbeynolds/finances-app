package trends

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/trends/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	trendsController := do.MustInvoke[controller.TrendsController](injector)

	_ = server.Group("/api/trends")
	// Endpoints will be added here
	_ = trendsController // Prevent unused variable error for now
}
