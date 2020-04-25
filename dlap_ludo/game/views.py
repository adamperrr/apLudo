#from django.views.decorators.csrf import csrf_exempt
#
#from rest_framework.response import Response
#import json
#from django.http import HttpRequest
#from rest_framework.request import Request

from django.contrib.auth.models import User, Group
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions, status
from rest_framework.parsers import JSONParser
from dlap_ludo.game.serializers import CreateRoomSerializer, UserSerializer, GroupSerializer

@csrf_exempt
def create_room(request):
    """
    The create_room view takes JSON message in format (to see requirements see serializers.py):
    {
        "is_private_room": true,
        "room_name": "name_of_room",
        "admin_plyer_username": "username_of_room's_admin_plyer"
    }

    Response format will be:
    {
        'token': 'token_generated_by_app_and_required_for_every_request',
        'is_plyer': 'did_plyer_get_to_the_room_as_plyer_or_there_was_no_place_and_is_watcher'
    }

    In case of error response status is different then 200:
    - 400 Bad request - response looks like:
        {"admin_plyer_username": ["This field may not be blank."]}
    or
        {"admin_plyer_username": ["Ensure this field has at least 8 characters."]}
    -
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CreateRoomSerializer(data=data)
        if serializer.is_valid():
            is_private_room = serializer.data['is_private_room']
            room_name = serializer.data['room_name']
            admin_plyer_username = serializer.data['admin_plyer_username']

            print(is_private_room, room_name, admin_plyer_username)

            return JsonResponse(serializer.data, status=201)

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