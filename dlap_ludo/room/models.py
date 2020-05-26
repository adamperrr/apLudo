from django.db import models


class Room(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50, blank=False, unique=True)
    is_private = models.BooleanField(default=True)

    def __str__(self):  # will be displayed in admin menu
        return self.name

    class Meta:
        ordering = ['created']


class Game(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    is_started = models.BooleanField(default=False)
    board = models.TextField(default='') # to store json object
    room = models.OneToOneField(to=Room, null=True, on_delete=models.SET_NULL)

    def __str__(self):  # will be displayed in admin menu
        return self.room

    class Meta:
        ordering = ['created']


class Player(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=50, blank=False)
    is_admin = models.BooleanField(default=False)
    token = models.CharField(max_length=64, blank=False, default='0000000000000000000000000000000000000000000000000000000000000000')
    color = models.CharField(max_length=10, blank=False, default='')
    room = models.ForeignKey(to=Room, null=True, on_delete=models.SET_NULL)

    def __str__(self):  # will be displayed in admin menu
        return self.name

    class Meta:
        ordering = ['created']
