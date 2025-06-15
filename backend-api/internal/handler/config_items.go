package handler

import (
	"backend/internal/database"
	"backend/internal/repository"
	"context"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

func RegisterConfigurationItemRoutes(app *fiber.App) {
	app.Post("/configuration_item", createConfigurationItemFiber)
	app.Get("/configuration_item/:id", getConfigurationItemFiber)
	app.Get("/configuration_items", listConfigurationItemsFiber)
	app.Put("/configuration_item/:id", updateConfigurationItemFiber)
	app.Delete("/configuration_item/:id", deleteConfigurationItemFiber)
}

func createConfigurationItemFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.InsertConfigurationItemParams
	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	created, err := repo.InsertConfigurationItem(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.Status(fiber.StatusCreated).JSON(created)
}

func getConfigurationItemFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	item, err := repo.FindConfigurationItemByID(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString("Not found: " + err.Error())
	}
	return c.JSON(item)
}

func listConfigurationItemsFiber(c fiber.Ctx) error {
	ctx := context.Background()
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	items, err := repo.FindAllConfigurationItems(ctx)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	return c.JSON(items)
}

func updateConfigurationItemFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.UpdateConfigurationItemParams

	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	item.ID, _ = uuid.Parse(c.Params("id"))
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	updated, err := repo.UpdateConfigurationItem(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.JSON(updated)
}

func deleteConfigurationItemFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	err = repo.DeleteConfigurationItem(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.SendStatus(204)
}
