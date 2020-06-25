from django.urls import path
from apLudo.room import views
from rest_framework import routers
from .views import UserViewSet, GroupViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = [
    path('', views.index_view, name='index_view'),
    path('create_room/', views.create_room, name='create_room'),
    path('join_room/', views.join_room, name='join_room'),
]