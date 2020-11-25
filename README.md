# Finances APP

* Creating a Database Backup
  ```bash
  > docker exec -t finances-app-db pg_dumpall -c -U financesAppUser > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
  ```

* Restoring the Database
  ```bash
  > cat your_dump.sql | docker exec -i finances-app-db psql -U financesAppUser -d financesAppDB
  ```

* Generating a Component
  ```bash
  > cd client
  > npm run generate component
  ```