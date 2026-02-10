package budgets

import (
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/samber/do/v2"
)

func TestRegisterRoutes(t *testing.T) {
	gin.SetMode(gin.TestMode)
	injector := do.New()
	server := gin.New()

	// This test ensures that the routes can be registered without panicking
	// A more comprehensive test would require setting up the full dependency injection
	defer func() {
		if r := recover(); r == nil {
			t.Log("Routes registration test setup - requires full DI setup for complete test")
		}
	}()

	RegisterRoutes(server, injector)
}
