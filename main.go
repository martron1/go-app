package main

import (
	"backend/internal/db"
	"backend/internal/repository"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	_ "github.com/joho/godotenv/autoload"
)

func playerHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	tx, _ := db.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)

	players, err := repo.FindAllPlayers(ctx)
	fmt.Println(players)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(players); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "JSON encode error: %v", err)
	}
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}

func createConfigurationItemHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	var item repository.InsertConfigurationItemParams
	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request: %v", err)
		return
	}
	tx, _ := db.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	created, err := repo.InsertConfigurationItem(ctx, item)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %v", err)
		return
	}
	tx.Commit(ctx)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(created)
}

func getConfigurationItemHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	idStr := r.URL.Query().Get("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid id: %v", err)
		return
	}
	tx, _ := db.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	item, err := repo.FindConfigurationItemByID(ctx, id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Not found: %v", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}

func listConfigurationItemsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	tx, _ := db.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	items, err := repo.FindAllConfigurationItems(ctx)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %v", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func updateConfigurationItemHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	var item repository.UpdateConfigurationItemParams
	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request: %v", err)
		return
	}
	tx, _ := db.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	updated, err := repo.UpdateConfigurationItem(ctx, item)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %v", err)
		return
	}
	tx.Commit(ctx)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updated)
}

func deleteConfigurationItemHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	idStr := r.URL.Query().Get("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid id: %v", err)
		return
	}
	tx, _ := db.Conn.Begin(ctx)
	defer tx.Rollback(ctx)
	repo := repository.New(tx)
	err = repo.DeleteConfigurationItem(ctx, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %v", err)
		return
	}
	tx.Commit(ctx)
	w.WriteHeader(http.StatusNoContent)
}

// create a healthchek endpoint that returns 200 OK
func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "OK")
}

func main() {

	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	db.InitDB(conn)
	if err != nil {
		os.Exit(1)
	}
	fmt.Println(conn, err)
	defer db.CloseDB()

	http.HandleFunc("GET /", helloHandler)

	http.HandleFunc("GET /players", playerHandler)

	http.HandleFunc("POST /configuration_item", createConfigurationItemHandler)
	http.HandleFunc("GET /configuration_item", getConfigurationItemHandler)
	http.HandleFunc("GET /configuration_items", listConfigurationItemsHandler)
	http.HandleFunc("PUT /configuration_item", updateConfigurationItemHandler)
	http.HandleFunc("DELETE /configuration_item", deleteConfigurationItemHandler)
	http.HandleFunc("GET /health", healthCheckHandler)

	fmt.Printf("Server starting on port 8080...\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
