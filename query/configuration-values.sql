-- name: FindAllConfigurationValues :many
SELECT * FROM configuration_values WHERE is_deleted = FALSE;

-- name: FindConfigurationValueByID :one
SELECT * FROM configuration_values WHERE id = $1 AND is_deleted = FALSE;

-- name: InsertConfigurationValue :one
INSERT INTO configuration_values (
    id, deployment_id, key, value
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: UpdateConfigurationValue :one
UPDATE configuration_values SET
    deployment_id = $2,
    key = $3,
    value = $4,
    updated_at = now()
WHERE id = $1 AND is_deleted = FALSE
RETURNING *;

-- name: DeleteConfigurationValue :exec
UPDATE configuration_values SET is_deleted = TRUE, updated_at = now() WHERE id = $1;

-- name: FindConfigurationValuesByDeploymentID :many
SELECT * FROM configuration_values WHERE deployment_id = $1 AND is_deleted = FALSE;