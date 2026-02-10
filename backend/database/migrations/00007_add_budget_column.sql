-- +goose Up
-- +goose StatementBegin

ALTER TABLE categories ADD COLUMN budget bigint DEFAULT NULL;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE categories DROP COLUMN budget;
-- +goose StatementEnd