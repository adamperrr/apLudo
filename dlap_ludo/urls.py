from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('dlap_ludo.room.urls')),
    path('game/', include('dlap_ludo.game.urls')),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # for development
# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # for production