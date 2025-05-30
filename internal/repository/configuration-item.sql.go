// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0
// source: configuration-item.sql

package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const deleteConfigurationItem = `-- name: DeleteConfigurationItem :exec
UPDATE configuration_items SET is_deleted = TRUE, updated_at = now() WHERE id = $1
`

func (q *Queries) DeleteConfigurationItem(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.Exec(ctx, deleteConfigurationItem, id)
	return err
}

const findAllConfigurationItems = `-- name: FindAllConfigurationItems :many
SELECT id, namespace, key, label, value, content_type, is_feature_flag, enabled, created_at, updated_at, is_deleted FROM configuration_items
`

func (q *Queries) FindAllConfigurationItems(ctx context.Context) ([]ConfigurationItem, error) {
	rows, err := q.db.Query(ctx, findAllConfigurationItems)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ConfigurationItem
	for rows.Next() {
		var i ConfigurationItem
		if err := rows.Scan(
			&i.ID,
			&i.Namespace,
			&i.Key,
			&i.Label,
			&i.Value,
			&i.ContentType,
			&i.IsFeatureFlag,
			&i.Enabled,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.IsDeleted,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const findConfigurationItemByID = `-- name: FindConfigurationItemByID :one
SELECT id, namespace, key, label, value, content_type, is_feature_flag, enabled, created_at, updated_at, is_deleted FROM configuration_items WHERE id = $1
`

func (q *Queries) FindConfigurationItemByID(ctx context.Context, id uuid.UUID) (ConfigurationItem, error) {
	row := q.db.QueryRow(ctx, findConfigurationItemByID, id)
	var i ConfigurationItem
	err := row.Scan(
		&i.ID,
		&i.Namespace,
		&i.Key,
		&i.Label,
		&i.Value,
		&i.ContentType,
		&i.IsFeatureFlag,
		&i.Enabled,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.IsDeleted,
	)
	return i, err
}

const insertConfigurationItem = `-- name: InsertConfigurationItem :one
INSERT INTO configuration_items (
    id, namespace, key, label, value, content_type, is_feature_flag, enabled
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
) RETURNING id, namespace, key, label, value, content_type, is_feature_flag, enabled, created_at, updated_at, is_deleted
`

type InsertConfigurationItemParams struct {
	ID            uuid.UUID   `json:"id"`
	Namespace     string      `json:"namespace"`
	Key           string      `json:"key"`
	Label         pgtype.Text `json:"label"`
	Value         string      `json:"value"`
	ContentType   pgtype.Text `json:"content_type"`
	IsFeatureFlag pgtype.Bool `json:"is_feature_flag"`
	Enabled       pgtype.Bool `json:"enabled"`
}

func (q *Queries) InsertConfigurationItem(ctx context.Context, arg InsertConfigurationItemParams) (ConfigurationItem, error) {
	row := q.db.QueryRow(ctx, insertConfigurationItem,
		arg.ID,
		arg.Namespace,
		arg.Key,
		arg.Label,
		arg.Value,
		arg.ContentType,
		arg.IsFeatureFlag,
		arg.Enabled,
	)
	var i ConfigurationItem
	err := row.Scan(
		&i.ID,
		&i.Namespace,
		&i.Key,
		&i.Label,
		&i.Value,
		&i.ContentType,
		&i.IsFeatureFlag,
		&i.Enabled,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.IsDeleted,
	)
	return i, err
}

const updateConfigurationItem = `-- name: UpdateConfigurationItem :one
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
RETURNING id, namespace, key, label, value, content_type, is_feature_flag, enabled, created_at, updated_at, is_deleted
`

type UpdateConfigurationItemParams struct {
	ID            uuid.UUID   `json:"id"`
	Namespace     string      `json:"namespace"`
	Key           string      `json:"key"`
	Label         pgtype.Text `json:"label"`
	Value         string      `json:"value"`
	ContentType   pgtype.Text `json:"content_type"`
	IsFeatureFlag pgtype.Bool `json:"is_feature_flag"`
	Enabled       pgtype.Bool `json:"enabled"`
	IsDeleted     bool        `json:"is_deleted"`
}

func (q *Queries) UpdateConfigurationItem(ctx context.Context, arg UpdateConfigurationItemParams) (ConfigurationItem, error) {
	row := q.db.QueryRow(ctx, updateConfigurationItem,
		arg.ID,
		arg.Namespace,
		arg.Key,
		arg.Label,
		arg.Value,
		arg.ContentType,
		arg.IsFeatureFlag,
		arg.Enabled,
		arg.IsDeleted,
	)
	var i ConfigurationItem
	err := row.Scan(
		&i.ID,
		&i.Namespace,
		&i.Key,
		&i.Label,
		&i.Value,
		&i.ContentType,
		&i.IsFeatureFlag,
		&i.Enabled,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.IsDeleted,
	)
	return i, err
}
