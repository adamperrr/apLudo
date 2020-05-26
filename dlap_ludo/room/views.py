from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.crypto import get_random_string
from django.shortcuts import render  # only form base view

from django.db import IntegrityError, transaction
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import viewsets, permissions
from rest_framework.parsers import JSONParser

from dlap_ludo.room.serializers import CreateRoomSerializer, JoinRoomSerializer, UserSerializer, GroupSerializer
from dlap_ludo.room.models import Room, Player, Game

import json
import dlap_ludo.utils as utils

@csrf_exempt
def index_view(request):
    return render(request, 'room/index.html')


@csrf_exempt
@transaction.non_atomic_requests
def create_room(request):
    """
    The create_room view takes JSON message in format (to see requirements see serializers.py):
    {
        "is_private_room": true,
        "room_name": "name_of_room",
        "admin_player_username": "username_of_room's_admin_plyer",
    }

    Response format will be:
    {
        'token': 'token_generated_by_app_and_required_for_every_request',
        'color': 'blue'
        'is_player': true/false, // did plyer get to the room as plyer or there was no place and is watcher
        'is_admin': true/false // can start/stop game
    }

    In case of error response status is different then 200:
    - 400 Bad request - response looks like:
        {"admin_player_username": ["This field may not be blank."]}
    or
        {"admin_player_username": ["Ensure this field has at least 8 characters."]}
    -
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CreateRoomSerializer(data=data)
        if serializer.is_valid():

            is_private_room = serializer.data['is_private_room']
            room_name = serializer.data['room_name']
            admin_player_username = serializer.data['admin_player_username']

            room = Room(name=room_name, is_private=is_private_room)
            try:
                room.save()
            except IntegrityError as e:
                return JsonResponse({'room_name': 'room_name already taken'}, status=400)

            color = utils.PAWN_INDEX_TO_COLOR[0]

            board = utils.EMPTY_BOARD
            board['pawns'][color] = utils.EMPTY_PLAYER_PAWNS
            game = Game(is_started=False, board=json.dumps(board), room=room)
            try:
                game.save()
            except IntegrityError as e:
                return JsonResponse({'room': 'game for this room already exist'}, status=400)

            token = get_random_string(length=64)
            # token = '0000000000000000000000000000000000000000000000000000000000000000'
            player = Player(name=admin_player_username, is_admin=True, room=room, token=token, color=color)
            player.save()

            response = {
                "token": token,
                "color": color,
                "is_player": True,
                "is_admin": True
            }

            return JsonResponse(response, status=201)

        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@transaction.non_atomic_requests
def join_room(request):
    """
    The join_room view takes JSON message in format (to see requirements see serializers.py):
    {
        "room_name": "name_of_room",
        "player_username": "username_of_player"
    }

    Response format will be:
    {
        'token': 'token_generated_by_app_and_required_for_every_request',
        'color': 'red'
        'is_player': true/false, // did plyer get to the room as plyer or there was no place and is watcher
        'is_admin': true/false // can start/stop game
    }

    In case of error response status is different then 200:
    - 400 Bad request - response looks like:
        {"player_username": ["This field may not be blank."]}
    or
        {"player_username": ["Ensure this field has at least 8 characters."]}
    -
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = JoinRoomSerializer(data=data)
        if serializer.is_valid():

            room_name = serializer.data['room_name']
            player_username = serializer.data['player_username']
            print(room_name, player_username)
            try:
                room = Room.objects.get(name=room_name)
            except ObjectDoesNotExist:
                return JsonResponse({'room_name': 'room object doesn\'t exist'}, status=400)

            try:
                game = Game.objects.get(room=room)
            except ObjectDoesNotExist:
                return JsonResponse({'room': 'game object doesn\'t exist'}, status=400)

            players_in_room = Player.objects.filter(room_id=room.id)

            for player_in_room in players_in_room:
                if player_in_room.name == player_username:
                    return JsonResponse({'player_username': 'player_username already exist in this room'}, status=400)

            color = utils.PAWN_INDEX_TO_COLOR[4]
            is_player = len(players_in_room) < 4 and (not game.is_started)
            if is_player:
                color = utils.PAWN_INDEX_TO_COLOR[len(players_in_room)]

            token = get_random_string(length=64)
            # token = '0000000000000000000000000000000000000000000000000000000000000000'
            player = Player(name=player_username, room=room, token=token, color=color)
            player.save()

            if not game.is_started and utils.PAWN_COLOR_TO_INDEX[player.color] < 4:  # is not watcher
                board = json.loads(game.board)
                board['pawns'][color] = utils.EMPTY_PLAYER_PAWNS
                game.board = json.dumps(board)
                game.save()

            response = {
                "token": token,
                "color": color,
                "is_player": is_player,
                "is_admin": False
            }

            return JsonResponse(response, status=201)

        return JsonResponse(serializer.errors, status=400)


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