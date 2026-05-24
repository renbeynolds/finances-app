-- +goose Up
-- +goose StatementBegin
ALTER TABLE public.investment_accounts
    ADD COLUMN include_in_retirement boolean NOT NULL DEFAULT false,
    ADD COLUMN annual_contribution bigint NOT NULL DEFAULT 0,
    ADD COLUMN expected_annual_return numeric(5,4) NOT NULL DEFAULT 0;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE public.investment_accounts
    DROP COLUMN IF EXISTS include_in_retirement,
    DROP COLUMN IF EXISTS annual_contribution,
    DROP COLUMN IF EXISTS expected_annual_return;
-- +goose StatementEnd
