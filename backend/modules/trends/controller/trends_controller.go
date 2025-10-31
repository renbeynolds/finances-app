package controller

import (
	"github.com/renbeynolds/finances-app/modules/trends/service"
	"github.com/renbeynolds/finances-app/pkg/constants"
	"github.com/samber/do/v2"
	"gorm.io/gorm"
)

type (
	TrendsController interface {
		// Controller methods will be added here
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
