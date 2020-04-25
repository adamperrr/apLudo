#DLAP Ludo
## First start


## Notes: Creation Django project
1. Create virtual environment (venv)
```bash
python3 -m venv venv
```
2. Install Django and Django REST framework in venv
```bash
pip install django
pip install djangorestframework
```
3. Create requirements.txt file for future venv modules initialization
```bash
pip freeze > requirements.txt
```
3.1. To load these modules to venv
```bash
pip install -r requirements.txt
```
4. Start Django project dlap_ludo
```bash
django-admin startproject dlap_ludo .
```
5. Create new app in project
```bash
cd dlap_ludo
django-admin startapp game
# or
python ../manage.py startapp game
```