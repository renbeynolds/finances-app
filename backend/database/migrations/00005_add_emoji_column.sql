-- +goose Up
-- +goose StatementBegin

ALTER TABLE categories ADD COLUMN "emoji" VARCHAR(255) DEFAULT NULL;
ALTER TABLE categories DROP COLUMN "icon_url";
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE categories DROP COLUMN "emoji";
ALTER TABLE categories ADD COLUMN "icon_url" VARCHAR(255) DEFAULT NULL;
-- +goose StatementEnd