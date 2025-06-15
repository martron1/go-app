-- name: FindAllPlayers :many
SELECT * FROM player;

-- name: InsertPlayer :exec
INSERT INTO player (id, username, email) VALUES ($1, $2, $3);