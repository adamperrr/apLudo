import {stopGame} from '../appEvents/index.js'
import getRoomWebSocket from '../getRoomWebSocket.js'

export function changeToGameViewState() {
    // Hide create room and join room forms
    document.getElementById("create_room__container").classList.add("d-none");
    document.getElementById("join_room__container").classList.add("d-none");


    // Make visible game room forms
    document.getElementById("room_name__header").classList.remove("d-none");
    document.getElementById("room_name__title").textContent = sessionStorage.getItem("roomName");

    document.getElementById("chat__container").classList.remove("d-none");

    document.getElementById("player_data__container").classList.remove("d-none");
    document.querySelector("#player_data__value_room_name div:first-child").textContent = sessionStorage.getItem("roomName");
    document.querySelector("#player_data__value_player_username div:first-child").textContent = sessionStorage.getItem("playerUsername");
    document.querySelector("#player_data__value_token div:first-child").textContent = sessionStorage.getItem("token");

    const isAdmin = sessionStorage.getItem("isAdmin");
    document.querySelector("#player_data__value_is_admin div:first-child").textContent = isAdmin;
    document.querySelector("#player_data__value_is_player div:first-child").textContent = sessionStorage.getItem("isPlayer");
    document.querySelector("#player_data__value_color div:first-child").textContent = sessionStorage.getItem("color");

    document.getElementById("game__container").classList.remove("d-none");
    if(isAdmin == 'true') {
        // console.log('[changeToGameViewState] Enabling stopGame button for admin.')
        document.getElementById("game__stop_game_button").disabled = false;
    }


    // Assign events related to WebSocket
    document.querySelector('#chat__message_input').addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            document.getElementById("chat__send_button").click();
        }
    }, false);

    document.getElementById("chat__send_button").addEventListener("click", event => {
        const messageInput = document.querySelector('#chat__message_input');
        const chatMessage = messageInput.value;

        if(chatMessage == "") { return; }

        const wsContentMessage = {
            'type': 'chat_message',
            'message': chatMessage
        };

        const roomWebSocket = getRoomWebSocket(() => {
            roomWebSocket.send(JSON.stringify(wsContentMessage));
        });

        messageInput.value = ''; // Clean input field
    }, false);

    document.getElementById("game__stop_game_button").addEventListener("click", event => stopGame(event), false);
}