import json

from channels.generic.websocket import AsyncWebsocketConsumer

from django.core.exceptions import ObjectDoesNotExist
from apLudo.room.models import Room, Player, Game
from apLudo.game.Gameplay import Gameplay

from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    """
    Runs when JS WebSocket connects to the URL <HOSTNAME>/ws/room/<room_name>/.
    """
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'room_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    """
    Runs when JS WebSocket disconnects.
    """
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    """
    Runs when server receives message from JS WebSocket and sends message to room group (Redis).
    """
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        message_type = text_data_json['type']
        message = text_data_json['message']

        print("receive():", text_data)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': message_type,  # choose function to send message to other users
                'message': message
            }
        )

    """
    When receives message sent by server to room group with type: chat_message.
    Sends message to JS WebSocket with type: chat_message.
    """
    async def chat_message(self, event):
        message = event['message']

        print("chat_message():", event)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'message': message
        }))

    """
    When receives message sent by server to room group with type: game_message.
    Sends message to JS WebSocket with type: game_message.
    
    Possible commands to send to JS WebSocket.
    message: "stopServer" - JS should remove all variables and close connection to WS.
    message: "changeContainersState" - JS should run refresh 
    """
    async def game_message(self, event):
        message = event['message']

        print("game_message():", event)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'game_message',
            'message': message
        }))

    """
    When receives message sent by server to room group with type: update_board.
    Sends message to JS WebSocket with type: update_board.
    """
    async def update_board(self, event):
        # try:
        #     room = Room.objects.get(name=self.room_name)
        # except ObjectDoesNotExist:
        #     # return JsonResponse({'room_name': 'room object doesn\'t exist'}, status=400)
        #     print('room_name: room object doesn\'t exist')
        #
        # try:
        #     game = Game.objects.get(room=room)
        # except ObjectDoesNotExist:
        #     # return JsonResponse({'room': 'game object doesn\'t exist'}, status=400)
        #     print('game: game object doesn\'t exist')

        print("update_board():", event)

        player_username = event['message']['player_username']  # TODO: use serializer
        token = event['message']['token']

        try:
            player = Player.objects.get(name=player_username, token=token)
        except ObjectDoesNotExist:
            player = None  # Goes to if condition

        if player is None:
            message = "Error_WrongUserOrToken_NoPlayerFound"
        else:
            # TODO: Add pawn move

            try:
                board = Game.objects.get(room=player.room).board
                # gameplay = Gameplay(board) # not needed to only read board
                message = board
            except ObjectDoesNotExist:
                message = "Error_WrongUserOrToken_NoBoardFound"

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'update_board',
            'message': message
        }))