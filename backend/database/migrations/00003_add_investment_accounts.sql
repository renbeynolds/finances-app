-- +goose Up
-- +goose StatementBegin
CREATE SEQUENCE public.investment_account_balances_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.investment_account_balances (
    id bigint NOT NULL DEFAULT nextval('investment_account_balances_id_seq'),
    date date NOT NULL,
    balance bigint NOT NULL,
    investment_account_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

ALTER SEQUENCE public.investment_account_balances_id_seq OWNED BY public.investment_account_balances.id;

CREATE SEQUENCE public.investment_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.investment_accounts (
    id bigint NOT NULL DEFAULT nextval('investment_accounts_id_seq'),
    name text NOT NULL,
    balance bigint DEFAULT '0'::numeric NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

ALTER SEQUENCE public.investment_accounts_id_seq OWNED BY public.investment_accounts.id;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- +goose StatementEnd