-- +goose Up
-- +goose StatementBegin
ALTER TABLE accounts ADD COLUMN "type" VARCHAR(255) NOT NULL DEFAULT 'cash';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE accounts DROP COLUMN "type";
-- +goose StatementEnd
