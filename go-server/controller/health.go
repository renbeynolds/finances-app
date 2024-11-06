package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/data/response"
)

type HealthController struct {
}

func NewHealthController() *HealthController {
	return &HealthController{}
}

func (controller *HealthController) Health(ctx *gin.Context) {
	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   nil,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}