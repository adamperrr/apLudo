from django.contrib import admin
from .models import Player, Room


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_admin', 'room')
    ordering = ('name',)
    search_fields = ('name',)


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_private')
    ordering = ('name',)
    search_fields = ('name',)