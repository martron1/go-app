-- name: FindAllConfigurationItems :many
SELECT * FROM configuration_items;

-- name: FindConfigurationItemByID :one
SELECT * FROM configuration_items WHERE id = $1;

-- name: InsertConfigurationItem :one
INSERT INTO configuration_items (
    id, namespace, key, label, value, content_type, is_feature_flag, enabled
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
) RETURNING *;

-- name: UpdateConfigurationItem :one
UPDATE configuration_items SET
    namespace = $2,
    key = $3,
    label = $4,
    value = $5,
    content_type = $6,
    is_feature_flag = $7,
    enabled = $8,
    updated_at = now(),
    is_deleted = $9
WHERE id = $1
RETURNING *;

-- name: DeleteConfigurationItem :exec
UPDATE configuration_items SET is_deleted = TRUE, updated_at = now() WHERE id = $1;