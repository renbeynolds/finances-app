-- +goose Up
-- +goose StatementBegin

ALTER TABLE accounts DROP COLUMN "date_format";
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
