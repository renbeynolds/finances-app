-- Accounts
ALTER SEQUENCE account_id_seq RENAME TO accounts_id_seq;
ALTER TABLE account ALTER COLUMN id TYPE BIGINT;
ALTER TABLE account ALTER COLUMN name TYPE TEXT;
ALTER TABLE account ALTER COLUMN "dateHeader" TYPE TEXT;
ALTER TABLE account RENAME COLUMN "dateHeader" TO date_header;
ALTER TABLE account ALTER COLUMN "descriptionHeader" TYPE TEXT;
ALTER TABLE account RENAME COLUMN "descriptionHeader" TO description_header;
ALTER TABLE account ALTER COLUMN "amountHeader" TYPE TEXT;
ALTER TABLE account RENAME COLUMN "amountHeader" TO amount_header;
ALTER TABLE account ALTER COLUMN "incomeHeader" TYPE TEXT;
ALTER TABLE account RENAME COLUMN "incomeHeader" TO income_header;
ALTER TABLE account ALTER COLUMN "expenseHeader" TYPE TEXT;
ALTER TABLE account RENAME COLUMN "expenseHeader" TO expense_header;
ALTER TABLE account ALTER COLUMN "color" TYPE TEXT;
ALTER TABLE account ALTER COLUMN "typeHeader" TYPE TEXT;
ALTER TABLE account RENAME COLUMN "typeHeader" TO type_header;
ALTER TABLE account ALTER COLUMN "amountsType" TYPE TEXT;
ALTER TABLE account RENAME COLUMN "amountsType" TO amounts_type;
ALTER TABLE account ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE account ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE account ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE account RENAME COLUMN "startingAmount" TO starting_amount;
ALTER TABLE account ALTER starting_amount TYPE BIGINT USING (starting_amount * 100)::BIGINT;
ALTER TABLE account ALTER balance TYPE BIGINT USING (balance * 100)::BIGINT;
ALTER TABLE account RENAME TO accounts;
UPDATE accounts SET created_at = Now();
UPDATE accounts SET updated_at = Now();

-- Categories
ALTER SEQUENCE category_id_seq RENAME TO categories_id_seq;
ALTER TABLE category ALTER COLUMN id TYPE BIGINT;
ALTER TABLE category ALTER COLUMN name TYPE TEXT;
ALTER TABLE category ALTER COLUMN "color" TYPE TEXT;
ALTER TABLE category ALTER COLUMN "parentCategoryId" TYPE BIGINT;
ALTER TABLE category RENAME COLUMN "parentCategoryId" TO parent_category_id;
ALTER TABLE category ALTER COLUMN "type" TYPE TEXT;
ALTER TABLE category ALTER COLUMN "iconUrl" TYPE TEXT;
ALTER TABLE category RENAME COLUMN "iconUrl" TO icon_url;
ALTER TABLE category RENAME TO categories;
ALTER TABLE categories ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE categories ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE categories ADD COLUMN deleted_at TIMESTAMPTZ;
UPDATE categories SET created_at = Now();
UPDATE categories SET updated_at = Now();

-- Prefix Rules
ALTER SEQUENCE prefix_rule_id_seq RENAME TO prefix_rules_id_seq;
ALTER TABLE prefix_rule ALTER COLUMN id TYPE BIGINT;
ALTER TABLE prefix_rule ALTER COLUMN prefix TYPE TEXT;
ALTER TABLE prefix_rule ALTER COLUMN "categoryId" TYPE BIGINT;
ALTER TABLE prefix_rule RENAME COLUMN "categoryId" TO category_id;
ALTER TABLE prefix_rule RENAME TO prefix_rules;
ALTER TABLE prefix_rules ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE prefix_rules ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE prefix_rules ADD COLUMN deleted_at TIMESTAMPTZ;
UPDATE prefix_rules SET created_at = Now();
UPDATE prefix_rules SET updated_at = Now();

-- Transactions
ALTER SEQUENCE transaction_id_seq RENAME TO transactions_id_seq;
ALTER TABLE "transaction" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "transaction" ALTER amount TYPE BIGINT USING (amount * 100)::BIGINT;
ALTER TABLE "transaction" ALTER balance TYPE BIGINT USING (balance * 100)::BIGINT;
ALTER TABLE "transaction" RENAME COLUMN "balanceCorrection" TO balance_correction;
ALTER TABLE "transaction" ALTER balance_correction TYPE BIGINT USING (balance_correction * 100)::BIGINT;
ALTER TABLE "transaction" RENAME COLUMN "uploadId" TO upload_id;
ALTER TABLE "transaction" ALTER COLUMN upload_id TYPE BIGINT;
ALTER TABLE "transaction" RENAME COLUMN "categoryId" TO category_id;
ALTER TABLE "transaction" ALTER COLUMN category_id TYPE BIGINT;
ALTER TABLE "transaction" RENAME TO transactions;
ALTER TABLE transactions ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE transactions ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE transactions ADD COLUMN deleted_at TIMESTAMPTZ;
UPDATE transactions SET created_at = Now();
UPDATE transactions SET updated_at = Now();

-- Uploads
ALTER SEQUENCE upload_id_seq RENAME TO uploads_id_seq;
ALTER TABLE upload ALTER COLUMN id TYPE BIGINT;
ALTER TABLE upload ALTER COLUMN "accountId" TYPE BIGINT;
ALTER TABLE upload RENAME COLUMN "accountId" TO account_id;
ALTER TABLE upload RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE upload ALTER COLUMN created_at DROP DEFAULT;
ALTER TABLE upload ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE upload ADD COLUMN deleted_at TIMESTAMPTZ;
UPDATE upload SET updated_at = Now();
ALTER TABLE upload RENAME TO uploads;
ALTER TABLE uploads ALTER COLUMN created_at TYPE TIMESTAMPTZ;
ALTER TABLE uploads ALTER COLUMN created_at DROP NOT NULL;

-- Miscellaneous
DROP TABLE migration_history;
DROP TABLE typeorm_metadata;