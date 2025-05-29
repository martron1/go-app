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

	fmt.Printf("Server starting on port 8080...\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
