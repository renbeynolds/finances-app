# Finances APP

- Creating a Database Backup

  ```bash
  > docker exec -t finance-app-db pg_dumpall -c -U username > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql
  ```

- Restoring the Database
  ```bash
  > cat your_dump.sql | docker exec -i finance-app-db psql -U username -d database
  ```

* Generating a Migration
  ```bash
  > cd server
  > yarn run typeorm migration:generate <migration_name> -d src/postgresDB.ts
  ```
