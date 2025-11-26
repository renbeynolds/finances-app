-- +goose Up
-- +goose StatementBegin

-- Create budgets table
CREATE TABLE public.budgets (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    amount bigint NOT NULL,
    category_id bigint
);

ALTER TABLE public.budgets OWNER TO username;

-- Create sequence for budgets table
CREATE SEQUENCE public.budgets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.budgets_id_seq OWNER TO username;
ALTER SEQUENCE public.budgets_id_seq OWNED BY public.budgets.id;
ALTER TABLE public.budgets ALTER COLUMN id SET DEFAULT nextval('public.budgets_id_seq'::regclass);

-- Set primary key
ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);

-- Add foreign key constraint to categories
ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT fk_budgets_category FOREIGN KEY (category_id) REFERENCES public.categories(id);

-- Create index on deleted_at for soft deletes
CREATE INDEX idx_budgets_deleted_at ON public.budgets USING btree (deleted_at);

-- Migrate existing budget data from categories table to budgets table
INSERT INTO public.budgets (amount, category_id, created_at, updated_at)
SELECT 
    budget as amount,
    id as category_id,
    COALESCE(created_at, NOW()) as created_at,
    COALESCE(updated_at, NOW()) as updated_at
FROM public.categories 
WHERE budget IS NOT NULL AND budget > 0;

-- Remove the budget column from categories table
ALTER TABLE public.categories DROP COLUMN budget;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

-- Add budget column back to categories table
ALTER TABLE public.categories ADD COLUMN budget bigint DEFAULT NULL;

-- Migrate budget data back to categories table
UPDATE public.categories 
SET budget = b.amount
FROM public.budgets b 
WHERE public.categories.id = b.category_id 
AND b.deleted_at IS NULL;

-- Drop budgets table and sequence
DROP TABLE public.budgets;
DROP SEQUENCE public.budgets_id_seq;

-- +goose StatementEnd
