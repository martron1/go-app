package db

import (
	"context"

	"github.com/jackc/pgx/v5"
)

var Conn *pgx.Conn

func InitDB(conn *pgx.Conn) {
	Conn = conn
	if Conn == nil {
		panic("Database connection is nil")
	}
}
func CloseDB() {
	if Conn != nil {
		err := Conn.Close(context.Background())
		if err != nil {
			panic("Failed to close database connection: " + err.Error())
		}
	}
}
