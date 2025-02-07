package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/util/paginate"
)

type Response struct {
	Code         int         `json:"code"`
	Status       string      `json:"status"`
	TotalRecords int64       `json:"totalRecords,omitempty"`
	Data         interface{} `json:"data,omitempty"`
}

func SendStatusOK(data interface{}, pagination *paginate.Pagination, ctx *gin.Context) {
	webResponse := Response{
		Code:   200,
		Status: "Ok",
		Data:   data,
	}
	if pagination != nil {
		webResponse.TotalRecords = pagination.TotalRecords
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}
