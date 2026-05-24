-- +goose Up
ALTER TABLE investment_accounts ADD COLUMN account_type TEXT NOT NULL DEFAULT 'TAXABLE';

-- +goose Down
ALTER TABLE investment_accounts DROP COLUMN account_type;
