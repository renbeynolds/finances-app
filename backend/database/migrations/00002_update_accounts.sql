-- +goose Up
-- +goose StatementBegin
ALTER TABLE accounts ADD COLUMN "amount_expression" VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE accounts ADD COLUMN "login_url" VARCHAR(255);
ALTER TABLE accounts ADD COLUMN "date_format" VARCHAR(255) NOT NULL DEFAULT '1/2/06';
ALTER TABLE accounts DROP COLUMN "amount_header";
ALTER TABLE accounts DROP COLUMN "type_header";
ALTER TABLE accounts DROP COLUMN "amounts_type";
ALTER TABLE accounts DROP COLUMN "income_header";
ALTER TABLE accounts DROP COLUMN "expense_header";
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- +goose StatementEnd