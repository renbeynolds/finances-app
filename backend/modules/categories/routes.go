package categories

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/categories/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	categoryController := do.MustInvoke[controller.CategoryController](injector)

	categoryRoutes := server.Group("/api/categories")
	{
		categoryRoutes.POST("", categoryController.CreateCategory)
		categoryRoutes.GET("", categoryController.GetAllCategories)
	}
}
