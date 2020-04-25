from django.db import models


class Room(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50, blank=False, unique=True)
    is_private = models.BooleanField(default=True)

    class Meta:
        ordering = ['created']


class Player(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50, blank=False)
    is_admin = models.BooleanField(default=True)
    room = models.ForeignKey(to=Room, null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ['created']