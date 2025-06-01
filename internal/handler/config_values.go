package handler

import (
	"backend/internal/database"
	"backend/internal/repository"
	"context"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

func RegisterConfigurationValueRoutes(app *fiber.App) {
	app.Post("/configuration_values", createConfigurationValueFiber)
	app.Get("/configuration_values/:id", getConfigurationValueFiber)
	app.Get("/configuration_values/deployment/:deployment_id", listConfigurationValuesByDeploymentIDFiber)
	app.Put("/configuration_values/:id", updateConfigurationValueFiber)
	app.Delete("/configuration_values/:id", deleteConfigurationValueFiber)
}

func createConfigurationValueFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.InsertConfigurationValueParams
	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	item.ID = uuid.New()
	item.DeploymentID, _ = uuid.Parse("b3b8c7e2-1a2b-4c3d-9e4f-123456789abd")
	tx, _ := database.Conn.Begin(ctx)
	repo := repository.New(tx)
	created, err := repo.InsertConfigurationValue(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.Status(fiber.StatusCreated).JSON(created)
}

func getConfigurationValueFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	repo := repository.New(database.Conn)
	item, err := repo.FindConfigurationValueByID(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString("Not found: " + err.Error())
	}
	return c.JSON(item)
}

func listConfigurationValuesByDeploymentIDFiber(c fiber.Ctx) error {
	ctx := context.Background()
	deploymentID, err := uuid.Parse(c.Params("deployment_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid deployment_id: " + err.Error())
	}
	repo := repository.New(database.Conn)
	items, err := repo.FindConfigurationValuesByDeploymentID(ctx, deploymentID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	return c.JSON(items)
}

func updateConfigurationValueFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.UpdateConfigurationValueParams
	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	item.ID, _ = uuid.Parse(c.Params("id"))
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	updated, err := repo.UpdateConfigurationValue(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.JSON(updated)
}

func deleteConfigurationValueFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	err = repo.DeleteConfigurationValue(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.SendStatus(fiber.StatusNoContent)
}
