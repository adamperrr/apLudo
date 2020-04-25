from django.contrib.auth.models import User, Group
from rest_framework import serializers


class CreateRoomSerializer(serializers.Serializer):
    is_private_room = serializers.BooleanField(default=True)
    room_name = serializers.CharField(min_length=8, max_length=50, allow_blank=False, trim_whitespace=True)
    admin_player_username = serializers.CharField(min_length=8, max_length=50, allow_blank=False, trim_whitespace=True)


class JoinRoomSerializer(serializers.Serializer):
    room_name = serializers.CharField(min_length=8, max_length=50, allow_blank=False, trim_whitespace=True)
    player_username = serializers.CharField(min_length=8, max_length=50, allow_blank=False, trim_whitespace=True)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']