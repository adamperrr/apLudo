import {changeContainersState} from '../test_front__functions.js'
import {stopGame} from './stopGame.js'

export function assignWebSocket(room_name) {
    const roomName = encodeURIComponent(room_name);
    const connWebSocket = new WebSocket(`ws:\/\/${window.location.host}\/ws\/room\/${roomName}\/`);

    connWebSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data);
        if(data.type == 'game_message' && data.message == "changeContainersState") {
            changeContainersState();
        }
        else if(data.type == 'game_message' && data.message == "stopServer") {
            connWebSocket.close();
            changeContainersState();
            alert('Game stopped by room admin.')
        }
        else {
            document.querySelector('#chat__log').value = data.message + '\n' + document.querySelector('#chat__log').value;
        }
    };

    connWebSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly.');
    };

    document.querySelector('#chat__message_input').onkeyup = function(e) {
        if (e.keyCode === 13) { document.getElementById("chat__send_button").click(); }
    };

    document.getElementById("chat__send_button")
        .addEventListener("click", event => {
            const messageInput = document.querySelector('#chat__message_input');
            const chatMessage = messageInput.value;

            if(chatMessage == "") { return; }

            const messageContent = {
                'type': 'chat_message',
                'message': chatMessage
            };

            connWebSocket.send(JSON.stringify(messageContent));

            messageInput.value = ''; // Clean input field
        });

    document.getElementById("game__stop_game_button")
        .addEventListener("click", event => stopGame(event, connWebSocket));
}