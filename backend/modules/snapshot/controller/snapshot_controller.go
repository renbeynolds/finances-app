package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/snapshot/dto"
	"github.com/renbeynolds/finances-app/modules/snapshot/query"
	"github.com/renbeynolds/finances-app/modules/snapshot/service"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"

	"gorm.io/gorm"
)

type (
	SnapshotController interface {
		GetIncomeVsAverage(ctx *gin.Context)
		GetExpenseVsAverage(ctx *gin.Context)
	}

	snapshotController struct {
		snapshotService service.SnapshotService
		db              *gorm.DB
	}
)

func NewSnapshotController(injector do.Injector, s service.SnapshotService) SnapshotController {
	db := do.MustInvokeNamed[*gorm.DB](injector, constants.DB)
	return &snapshotController{
		snapshotService: s,
		db:              db,
	}
}

func (c *snapshotController) GetIncomeVsAverage(ctx *gin.Context) {
	var query query.AmountVsAverageQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_INCOME_VS_AVERAGE, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	data := c.snapshotService.GetIncomeVsAverage(ctx, *query.From, *query.To, *query.AvgFrom, *query.AvgTo)
	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_INCOME_VS_AVERAGE, data, nil)
	ctx.JSON(200, res)
}

func (c *snapshotController) GetExpenseVsAverage(ctx *gin.Context) {
	var query query.AmountVsAverageQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_EXPENSE_VS_AVERAGE, err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	data := c.snapshotService.GetExpenseVsAverage(ctx, *query.From, *query.To, *query.AvgFrom, *query.AvgTo)
	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_EXPENSE_VS_AVERAGE, data, nil)
	ctx.JSON(200, res)
}
