from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from dlap_ludo.game import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('', views.base_view, name='base_view'),

    path('game/check_token/', views.check_token, name='check_token'),
    path('game/stop_game/', views.stop_game, name='stop_game'),
    path('game/get_board/', views.get_board, name='get_board'),
    path('game/create_room/', views.create_room, name='create_room'),
    path('game/join_room/', views.join_room, name='join_room'),

    path('admin/', admin.site.urls)
]
