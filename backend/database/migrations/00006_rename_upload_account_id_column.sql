-- +goose Up
-- +goose StatementBegin

ALTER TABLE uploads RENAME COLUMN account_id to bank_account_id;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE uploads RENAME COLUMN bank_account_id to account_id;
-- +goose StatementEnd