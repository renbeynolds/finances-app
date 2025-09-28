package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/renbeynolds/finances-app/server"
)

func run(server *gin.Engine) {
	server.Static("/assets", "./assets")

	port := os.Getenv("GOLANG_PORT")
	if port == "" {
		port = "8888"
	}

	var serve string
	if os.Getenv("APP_ENV") == "localhost" {
		serve = "0.0.0.0:" + port
	} else {
		serve = ":" + port
	}

	if err := server.Run(serve); err != nil {
		log.Fatalf("error running server: %v", err)
	}
}

func main() {
	server := server.MakeServer(server.ServerOpts{
		DBType: "postgres",
	})
	run(server)
}
