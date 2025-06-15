package database

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

var Conn *pgxpool.Pool

func InitDB(conn *pgxpool.Pool) {
	Conn = conn
	if Conn == nil {
		panic("Database connection is nil")
	}
}
func CloseDB() {
	if Conn != nil {
		Conn.Close()
	}
}
