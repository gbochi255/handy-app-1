# Handy Backend Setup

Backend developers will need to install the PostGis add-on before they can work on the backend.
Here's how...

### 1. Install Dependencies

- **PostgreSQL**  
- **PostGIS**  
  ```bash
  sudo apt install postgresql-16-postgis-3
  ```

### 2. Pull the Repository

```bash
git pull origin main
```

### 3. Verify PostGIS Installation

1. Access PostgreSQL:
   ```bash
   psql
   ```

2. Connect to the database:
   ```sql
   \c handy_dev;
   ```

3. Check the PostGIS version:
   ```sql
   SELECT postgis_full_version();
   ```

It should return something like:
```
POSTGIS="3.5.2" [EXTENSION] PGSQL="160" GEOS="3.12.1-CAPI-1.18.1" PROJ="9.4.0" LIBXML="2.9.14" LIBJSON="0.17" LIBPROTOBUF="1.4.1" Wagyu="0.5.0 (Internal)" TOPOLOGY
```
