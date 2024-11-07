package router

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/controller"
)

func NewRouter(healthController controller.HealthController, accountController controller.AccountController) *gin.Engine {
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
	}

	return router
}