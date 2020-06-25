from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from apLudo.game import views

urlpatterns = [
    path('check_token/', views.check_token, name='check_token'),
    path('stop_game/', views.stop_game, name='stop_game'),
    # path('get_board/', views.get_board, name='get_board'),
]