package main

import (
	"backend/internal/database"
	"backend/internal/handler"
	"context"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	conn, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		os.Exit(1)
	}
	database.InitDB(conn)
	defer database.CloseDB()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
	}))

	handler.RegisterConfigurationItemRoutes(app)
	handler.RegisterApplicationRoutes(app)
	handler.RegisterConfigurationValueRoutes(app)
	handler.RegisterDeploymentRoutes(app)

	if err := app.Listen(":8080", createFiberConfig()); err != nil {
		os.Exit(1)
	}
}

func createFiberConfig() fiber.ListenConfig {
	return fiber.ListenConfig{
		EnablePrintRoutes:     true,
		DisableStartupMessage: true,
	}
}
