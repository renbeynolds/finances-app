-- +goose Up
-- +goose StatementBegin
--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: account_amountstype_enum; Type: TYPE; Schema: public; Owner: username
--

CREATE TYPE public.account_amountstype_enum AS ENUM (
    'negamtexp',
    'posamtexp',
    'septypecol',
    'sepincexp'
);


ALTER TYPE public.account_amountstype_enum OWNER TO username;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public.accounts (
    id bigint NOT NULL,
    name text NOT NULL,
    date_header text NOT NULL,
    description_header text NOT NULL,
    amount_header text,
    starting_amount bigint DEFAULT '0'::numeric NOT NULL,
    balance bigint DEFAULT '0'::numeric NOT NULL,
    color text,
    type_header text,
    amounts_type text NOT NULL,
    income_header text,
    expense_header text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.accounts OWNER TO username;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO username;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name text NOT NULL,
    color text,
    parent_category_id bigint,
    type text DEFAULT 'expense'::text NOT NULL,
    icon_url text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.categories OWNER TO username;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO username;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: prefix_rules; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public.prefix_rules (
    id bigint NOT NULL,
    prefix text NOT NULL,
    category_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.prefix_rules OWNER TO username;

--
-- Name: prefix_rules_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE public.prefix_rules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prefix_rules_id_seq OWNER TO username;

--
-- Name: prefix_rules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE public.prefix_rules_id_seq OWNED BY public.prefix_rules.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public.transactions (
    id bigint NOT NULL,
    date date NOT NULL,
    description text NOT NULL,
    comment text,
    amount bigint NOT NULL,
    balance bigint NOT NULL,
    balance_correction bigint DEFAULT '0'::numeric NOT NULL,
    upload_id bigint NOT NULL,
    category_id bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.transactions OWNER TO username;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO username;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: uploads; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public.uploads (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    account_id bigint NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.uploads OWNER TO username;

--
-- Name: uploads_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE public.uploads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uploads_id_seq OWNER TO username;

--
-- Name: uploads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE public.uploads_id_seq OWNED BY public.uploads.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: prefix_rules id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.prefix_rules ALTER COLUMN id SET DEFAULT nextval('public.prefix_rules_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: uploads id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.uploads ALTER COLUMN id SET DEFAULT nextval('public.uploads_id_seq'::regclass);


--
-- Name: prefix_rules PK_1d6ea65ed93fe3865634edf311c; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.prefix_rules
    ADD CONSTRAINT "PK_1d6ea65ed93fe3865634edf311c" PRIMARY KEY (id);


--
-- Name: uploads PK_1fe8db121b3de4ddfa677fc51f3; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY (id);


--
-- Name: accounts PK_54115ee388cdb6d86bb4bf5b2ea; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY (id);


--
-- Name: transactions PK_89eadb93a89810556e1cbcd6ab9; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY (id);


--
-- Name: categories PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: categories UQ_23c05c292c439d77b0de816b500; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE (name);


--
-- Name: accounts UQ_414d4052f22837655ff312168cb; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "UQ_414d4052f22837655ff312168cb" UNIQUE (name);


--
-- Name: idx_accounts_deleted_at; Type: INDEX; Schema: public; Owner: username
--

CREATE INDEX idx_accounts_deleted_at ON public.accounts USING btree (deleted_at);


--
-- Name: idx_categories_deleted_at; Type: INDEX; Schema: public; Owner: username
--

CREATE INDEX idx_categories_deleted_at ON public.categories USING btree (deleted_at);


--
-- Name: idx_prefix_rules_deleted_at; Type: INDEX; Schema: public; Owner: username
--

CREATE INDEX idx_prefix_rules_deleted_at ON public.prefix_rules USING btree (deleted_at);


--
-- Name: idx_transactions_deleted_at; Type: INDEX; Schema: public; Owner: username
--

CREATE INDEX idx_transactions_deleted_at ON public.transactions USING btree (deleted_at);


--
-- Name: idx_uploads_deleted_at; Type: INDEX; Schema: public; Owner: username
--

CREATE INDEX idx_uploads_deleted_at ON public.uploads USING btree (deleted_at);


--
-- Name: uploads FK_585e1cb7b4fac9a8f008f2ff94b; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b" FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: categories FK_9e5435ba76dbc1f1a0705d4db43; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY (parent_category_id) REFERENCES public.categories(id);


--
-- Name: transactions FK_aac68c0d0cd4409a8d5c7b65d6c; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c" FOREIGN KEY (upload_id) REFERENCES public.uploads(id);


--
-- Name: transactions FK_d3951864751c5812e70d033978d; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: prefix_rules FK_eec0d33531e531562c199bb0c60; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.prefix_rules
    ADD CONSTRAINT "FK_eec0d33531e531562c199bb0c60" FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: uploads fk_accounts_uploads; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT fk_accounts_uploads FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: prefix_rules fk_categories_prefix_rules; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.prefix_rules
    ADD CONSTRAINT fk_categories_prefix_rules FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: categories fk_categories_sub_categories; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_categories_sub_categories FOREIGN KEY (parent_category_id) REFERENCES public.categories(id);


--
-- Name: transactions fk_categories_transactions; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_categories_transactions FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: transactions fk_uploads_transactions; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_uploads_transactions FOREIGN KEY (upload_id) REFERENCES public.uploads(id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_uploads_transactions;
ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_categories_transactions;
ALTER TABLE ONLY public.categories DROP CONSTRAINT fk_categories_sub_categories;
ALTER TABLE ONLY public.prefix_rules DROP CONSTRAINT fk_categories_prefix_rules;
ALTER TABLE ONLY public.uploads DROP CONSTRAINT fk_accounts_uploads;
ALTER TABLE ONLY public.prefix_rules DROP CONSTRAINT "FK_eec0d33531e531562c199bb0c60";
ALTER TABLE ONLY public.transactions DROP CONSTRAINT "FK_d3951864751c5812e70d033978d";
ALTER TABLE ONLY public.transactions DROP CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c";
ALTER TABLE ONLY public.categories DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43";
ALTER TABLE ONLY public.uploads DROP CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b";
DROP INDEX public.idx_uploads_deleted_at;
DROP INDEX public.idx_transactions_deleted_at;
DROP INDEX public.idx_prefix_rules_deleted_at;
DROP INDEX public.idx_categories_deleted_at;
DROP INDEX public.idx_accounts_deleted_at;
ALTER TABLE ONLY public.accounts DROP CONSTRAINT "UQ_414d4052f22837655ff312168cb";
ALTER TABLE ONLY public.categories DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500";
ALTER TABLE ONLY public.categories DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03";
ALTER TABLE ONLY public.transactions DROP CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9";
ALTER TABLE ONLY public.accounts DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea";
ALTER TABLE ONLY public.uploads DROP CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3";
ALTER TABLE ONLY public.prefix_rules DROP CONSTRAINT "PK_1d6ea65ed93fe3865634edf311c";
ALTER TABLE public.uploads ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.prefix_rules ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.accounts ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.uploads_id_seq;
DROP TABLE public.uploads;
DROP SEQUENCE public.transactions_id_seq;
DROP TABLE public.transactions;
DROP SEQUENCE public.prefix_rules_id_seq;
DROP TABLE public.prefix_rules;
DROP SEQUENCE public.categories_id_seq;
DROP TABLE public.categories;
DROP SEQUENCE public.accounts_id_seq;
DROP TABLE public.accounts;
DROP TYPE public.account_amountstype_enum;
DROP EXTENSION pg_trgm;
-- +goose StatementEnd