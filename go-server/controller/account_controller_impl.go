package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/service"
)

func NewAccountController(service service.AccountService) *AccountController {
	return &AccountController{accountService: service}
}

func (controller *AccountController) FindAll(ctx *gin.Context) {
	tagResponse := controller.accountService.FindAll()

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   tagResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}