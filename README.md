# apLudo
## Another run
1. Open repository folder in console (the one where requirements.txt is localized, not the one where static and game directories are)
```bash
cd apLudo
```

2. Pull repo changes
```bash
git pull
```

3. Activate venv
* On Windows
```bash
venv/Scripts/activate.bat
```
* On Linux
```bash
source venv/bin/activate
```

4. Migrate database
```bash
python manage.py migrate
```

5. Run Redis
```bash
docker run -p 6379:6379 -d redis:5
```

6. Run server
```bash
python manage.py runserver
```

## First run
1. Clone repo
```bash
git clone https://github.com/adamperrr/apLudo
```
2. Open repository folder in console (the one where requirements.txt is localized, not the one where static and game directories are)
```bash
cd apLudo
```

3. Create venv
```bash
python -m venv venv
```

4. Activate venv
* On Windows
```bash
venv/Scripts/activate.bat
```
* On Linux
```bash
source venv/bin/activate
```

5. Migrate database
```bash
python manage.py migrate
```

6. Create admin user
```bash
python manage.py createsuperuser --email admin@example.com --username admin
# for development purposses assign password: admin
```

7. Run server
```bash
python manage.py runserver
```

8. Run Redis
```bash
docker run -p 6379:6379 -d redis:5
```
## Docker Redis container usage
1. Activate channel layer
```bash
docker run -p 6379:6379 -d redis:5
```
2. List working containers
```bash
docker ps
```
3. Kill container
```bash
docker container kill [CONTAINER_ID]
```
