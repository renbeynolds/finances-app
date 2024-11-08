package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Code   int         `json:"code"`
	Status string      `json:"status"`
	Data   interface{} `json:"data,omitempty"`
}

func SendStatusOK(data interface{}, ctx *gin.Context) {
	webResponse := Response{
		Code:   200,
		Status: "Ok",
		Data:   data,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}