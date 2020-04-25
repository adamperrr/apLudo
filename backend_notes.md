# Notes: Creation Django project
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
6. Migrate - create sqlite3 database and create tables for user's management in it
```bash
python manage.py migrate
```
7. Create superuser of the system
```bash
python manage.py createsuperuser --email admin@example.com --username admin
# to development purposses assign password: admin
```
8. Create serializers.py file in dlap_ludo/game directory
```python
from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
```
9. Update dlap_ludo/game/views.py
```python
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
```
10. Update dlap_ludo/urls.py with below code
```python
from django.urls import include, path
from rest_framework import routers
from dlap_ludo.game import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```
11. Add rest-framework to INSTALLED_APPS
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```
12. Run server
```bash
python manage.py runserver
```