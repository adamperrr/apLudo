import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    """
    When JS WebSocket connects to the URL <HOSTNAME>/ws/room/<room_name>/.
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
    When JS WebSocket disconnects.
    """
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    """
    Server receives message from JS WebSocket and sends message to room group (Redis).
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