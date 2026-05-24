-- +goose Up
ALTER TABLE investment_accounts ADD COLUMN annual_volatility DECIMAL NOT NULL DEFAULT 0.15;

-- +goose Down
ALTER TABLE investment_accounts DROP COLUMN annual_volatility;
