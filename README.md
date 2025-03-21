# Finances APP

Old Version: 5d8073d8faa1f26769807bbeea76a52d5ed974f0

- Creating a Database Backup

  ```bash
  > docker exec -t finance-app-db pg_dumpall -c -U username > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql
  ```

- Creating a Schema Dump

  ```bash
  > docker exec -t finance-app-db pg_dump -c -U username --schema-only database > schema_`date +%Y-%m-%d"_"%H_%M_%S`.sql
  ```

- Restoring the Database
  ```bash
  > cat your_dump.sql | docker exec -i finance-app-db psql -U username -d database
  ```

* Generating a Migration
  ```bash
  > go install github.com/pressly/goose/v3/cmd/goose@latest
  > goose -s -dir go-server/migrations create [NAME] sql
  ```
