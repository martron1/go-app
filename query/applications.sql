-- name: FindAllApplications :many
SELECT * FROM applications WHERE is_deleted = FALSE;

-- name: FindApplicationByID :one
SELECT * FROM applications WHERE id = $1 AND is_deleted = FALSE;

-- name: InsertApplication :one
INSERT INTO applications (
    id, name, user_id
) VALUES (
    $1, $2, $3
) RETURNING *;

-- name: UpdateApplication :one
UPDATE applications SET
    name = $2,
    user_id = $3,
    updated_at = now()
WHERE id = $1 AND is_deleted = FALSE
RETURNING *;

-- name: DeleteApplication :exec
UPDATE applications SET is_deleted = TRUE, updated_at = now() WHERE id = $1;

-- name: FindApplicationsByUserID :many
SELECT * FROM applications WHERE user_id = $1 AND is_deleted = FALSE;