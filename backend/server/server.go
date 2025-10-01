package server

import (
	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/middlewares"
	"github.com/renbeynolds/finances-app/modules/banking"
	"github.com/renbeynolds/finances-app/modules/categories"
	"github.com/renbeynolds/finances-app/modules/investments"
	"github.com/renbeynolds/finances-app/modules/uploads"
	"github.com/renbeynolds/finances-app/providers"
	"github.com/samber/do/v2"
)

type ServerOpts struct {
	DBType string
}

func MakeServer(opts ServerOpts) *gin.Engine {
	injector := do.New()
	providers.RegisterDependencies(injector, opts.DBType)
	server := gin.Default()
	server.Use(middlewares.CORSMiddleware())
	banking.RegisterRoutes(server, injector)
	investments.RegisterRoutes(server, injector)
	uploads.RegisterRoutes(server, injector)
	categories.RegisterRoutes(server, injector)
	return server
}
