-- +goose Up
-- +goose StatementBegin

-- Add unique constraint to category_id in budgets table
ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_category_id_unique UNIQUE (category_id);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

-- Drop unique constraint from category_id in budgets table
ALTER TABLE ONLY public.budgets
    DROP CONSTRAINT IF EXISTS budgets_category_id_unique;

-- +goose StatementEnd
