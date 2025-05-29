CREATE TABLE configuration_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    namespace TEXT NOT NULL,
    key TEXT NOT NULL,
    label TEXT,
    value TEXT NOT NULL,
    content_type TEXT,
    is_feature_flag BOOLEAN DEFAULT FALSE,
    enabled BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT uq_config_key UNIQUE (namespace, key, label)
);