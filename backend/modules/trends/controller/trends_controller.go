package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/modules/trends/dto"
	"github.com/renbeynolds/finances-app/modules/trends/service"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/samber/do/v2"
	"gorm.io/gorm"
)

type (
	TrendsController interface {
		GetIncomeVsExpense(ctx *gin.Context)
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
	var query dto.IncomeVsExpenseQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		res := utils.BuildResponseFailed("Failed to get income vs expense data", err.Error())
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	result, err := c.trendsService.GetIncomeVsExpense(ctx.Request.Context(), query)
	if err != nil {
		res := utils.BuildResponseFailed("Failed to get income vs expense data", err.Error())
		ctx.JSON(http.StatusInternalServerError, res)
		return
	}

	res := utils.BuildResponseSuccess("Income vs expense data retrieved successfully", result, nil)
	ctx.JSON(http.StatusOK, res)
}
