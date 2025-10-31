package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/trends/dto"
	"github.com/renbeynolds/finances-app/modules/trends/query"
	"github.com/renbeynolds/finances-app/modules/trends/service"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"
	"gorm.io/gorm"
)

type (
	TrendsController interface {
		GetIncomeVsExpense(ctx *gin.Context)
		GetNetWorth(ctx *gin.Context)
	}

	trendsController struct {
		trendsService service.TrendsService
		db            *gorm.DB
	}
)

func NewTrendsController(injector do.Injector, s service.TrendsService) TrendsController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	return &trendsController{
		trendsService: s,
		db:            db,
	}
}

func (c *trendsController) GetIncomeVsExpense(ctx *gin.Context) {
	var q query.IncomeVsExpenseQuery
	if err := ctx.ShouldBindQuery(&q); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_INCOME_VS_EXPENSE, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	result, err := c.trendsService.GetIncomeVsExpense(ctx.Request.Context(), q)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_INCOME_VS_EXPENSE, err.Error())
		ctx.JSON(http.StatusInternalServerError, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_INCOME_VS_EXPENSE, result, nil)
	ctx.JSON(http.StatusOK, res)
}

func (c *trendsController) GetNetWorth(ctx *gin.Context) {
	var q query.NetWorthQuery
	if err := ctx.ShouldBindQuery(&q); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_NET_WORTH, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	result, err := c.trendsService.GetNetWorth(ctx.Request.Context(), q)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_NET_WORTH, err.Error())
		ctx.JSON(http.StatusInternalServerError, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_NET_WORTH, result, nil)
	ctx.JSON(http.StatusOK, res)
}
