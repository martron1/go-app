package handler

import (
	"backend/internal/database"
	"backend/internal/repository"
	"context"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

func RegisterApplicationRoutes(app *fiber.App) {
	app.Post("/applications", createApplicationFiber)
	app.Get("/applications/:id", getApplicationFiber)
	app.Get("/applications", listApplicationsFiber)
	app.Get("/applications/user/:user_id", listApplicationsByUserIDFiber)
	app.Put("/applications/:id", updateApplicationFiber)
	app.Delete("/applications/:id", deleteApplicationFiber)
}

func createApplicationFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.InsertApplicationParams
	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	item.UserID, _ = uuid.NewV7()
	item.ID, _ = uuid.NewV7()
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	created, err := repo.InsertApplication(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.Status(fiber.StatusCreated).JSON(created)
}

func getApplicationFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	repo := repository.New(database.Conn)
	item, err := repo.FindApplicationByID(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString("Not found: " + err.Error())
	}
	return c.JSON(item)
}

func listApplicationsFiber(c fiber.Ctx) error {
	ctx := context.Background()
	repo := repository.New(database.Conn)
	items, err := repo.FindAllApplications(ctx)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	return c.JSON(items)
}

func listApplicationsByUserIDFiber(c fiber.Ctx) error {
	ctx := context.Background()
	userID, err := uuid.Parse(c.Params("user_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid user_id: " + err.Error())
	}
	repo := repository.New(database.Conn)
	items, err := repo.FindApplicationsByUserID(ctx, userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	return c.JSON(items)
}

func updateApplicationFiber(c fiber.Ctx) error {
	ctx := context.Background()
	var item repository.UpdateApplicationParams
	if err := c.Bind().Body(&item); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request: " + err.Error())
	}
	item.ID, _ = uuid.Parse(c.Params("id"))
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	updated, err := repo.UpdateApplication(ctx, item)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.JSON(updated)
}

func deleteApplicationFiber(c fiber.Ctx) error {
	ctx := context.Background()
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid id: " + err.Error())
	}
	tx, _ := database.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	err = repo.DeleteApplication(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error: " + err.Error())
	}
	tx.Commit(ctx)
	return c.SendStatus(204)
}
