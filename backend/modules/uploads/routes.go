package uploads

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/uploads/controller"
	"github.com/samber/do/v2"
)

func RegisterRoutes(server *gin.Engine, injector do.Injector) {
	uploadController := do.MustInvoke[controller.UploadController](injector)

	uploadRoutes := server.Group("/api/uploads")
	{
		uploadRoutes.POST("", uploadController.CreateUpload)
		uploadRoutes.GET("", uploadController.GetAllUploads)
	}
}
