-- name: FindAllDeployments :many
SELECT * FROM deployments WHERE is_deleted = FALSE;

-- name: FindDeploymentByID :one
SELECT * FROM deployments WHERE id = $1 AND is_deleted = FALSE;

-- name: InsertDeployment :one
INSERT INTO deployments (
    id, application_id, name
) VALUES (
    $1, $2, $3
) RETURNING *;

-- name: UpdateDeployment :one
UPDATE deployments SET
    application_id = $2,
    name = $3,
    updated_at = now()
WHERE id = $1 AND is_deleted = FALSE
RETURNING *;

-- name: DeleteDeployment :exec
UPDATE deployments SET is_deleted = TRUE, updated_at = now() WHERE id = $1;

-- name: FindDeploymentsByApplicationID :many
SELECT * FROM deployments WHERE application_id = $1 AND is_deleted = FALSE;