package handler

import (
	"backend/internal/database"
	"backend/internal/repository"
	"context"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

func RegisterDeploymentRoutes(app *fiber.App) {
	app.Post("/deployments", createDeploymentFiber)
	app.Get("/deployments/:id", getDeploymentFiber)
	app.Get("/deployments", listDeploymentsFiber)
	app.Get("/deployments/application/:application_id", listDeploymentsByApplicationIDFiber)
	app.Put("/deployments/:id", updateDeploymentFiber)
	app.Delete("/deployments/:id", deleteDeploymentFiber)
}

func createDeploymentFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.InsertDeploymentParams
	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	item.ID = uuid.New()
	tx, _ := database.Conn.Begin(ctx)
	repo := repository.New(tx)
	created, err := repo.InsertDeployment(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.Status(fiber.StatusCreated).JSON(created)
}

func getDeploymentFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	repo := repository.New(database.Conn)
	item, err := repo.FindDeploymentByID(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString("Not found: " + err.Error())
	}
	return c.JSON(item)
}

func listDeploymentsFiber(c fiber.Ctx) error {
	ctx := context.Background()
	repo := repository.New(database.Conn)
	items, err := repo.FindAllDeployments(ctx)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	return c.JSON(items)
}

func listDeploymentsByApplicationIDFiber(c fiber.Ctx) error {
	ctx := context.Background()
	applicationID, err := uuid.Parse(c.Params("application_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid application_id: " + err.Error())
	}
	repo := repository.New(database.Conn)
	items, err := repo.FindDeploymentsByApplicationID(ctx, applicationID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	return c.JSON(items)
}

func updateDeploymentFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.UpdateDeploymentParams
	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	item.ID, _ = uuid.Parse(c.Params("id"))
	tx, _ := database.Conn.Begin(ctx)
	repo := repository.New(tx)
	updated, err := repo.UpdateDeployment(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.JSON(updated)
}

func deleteDeploymentFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	tx, _ := database.Conn.Begin(ctx)
	repo := repository.New(tx)
	err = repo.DeleteDeployment(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.SendStatus(fiber.StatusNoContent)
}
