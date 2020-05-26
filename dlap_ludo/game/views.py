from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.crypto import get_random_string

from rest_framework import viewsets, permissions
from rest_framework.parsers import JSONParser

from dlap_ludo.room.serializers import TokenSerializer
from dlap_ludo.room.models import Room, Player

from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from django.shortcuts import render  # only form base view


@csrf_exempt
def check_token(request):
    """
    The check_token view takes JSON message in format (to see requirements see serializers.py):
    {
        'token': 'token_generated_by_app_and_required_for_every_request',
        'admin_player_username': 'admin_player_username'
    }

    Response status will be: 204
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TokenSerializer(data=data)
        if serializer.is_valid():
            token = serializer.data['token']
            player_username = serializer.data['player_username']

            token_ok = True

            try:
                player = Player.objects.get(token=token, name=player_username)
            except ObjectDoesNotExist:
                token_ok = False

            return JsonResponse({'token_ok': token_ok}, status=201)

        return JsonResponse({'token_ok': False}, status=201)


@csrf_exempt
def stop_game(request):
    """
    The stop_game view takes JSON message in format (to see requirements see serializers.py):
    {
        'token': 'token_generated_by_app_and_required_for_every_request',
        'admin_player_username': 'admin_player_username'
    }

    Response status will be: 204
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TokenSerializer(data=data)
        if serializer.is_valid():
            token = serializer.data['token']
            player_username = serializer.data['player_username']

            try:
                player = Player.objects.get(token=token, name=player_username)
            except ObjectDoesNotExist:
                return JsonResponse({'token': 'wrong token or admin_player_username'}, status=401)

            if not player.is_admin:
                return JsonResponse({'is_admin': 'user is not admin'}, status=401)

            room = player.room
            players_in_room = Player.objects.filter(room_id=room.id)
            for player_in_room in players_in_room:
                player_in_room.delete()

            room.delete()

            return JsonResponse({'ok': True}, status=201)

        return JsonResponse(serializer.errors, status=400)

