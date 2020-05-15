import * as eventsFunCollector from './test_front__events.js'

export function assignEvents() {
    const roomName = encodeURIComponent(sessionStorage.getItem("roomName"));
    const LiveConnSocket = new WebSocket(`ws:\/\/${window.location.host}\/ws\/room\/${roomName}\/`);

    LiveConnSocket.onmessage = function(e) {

        const data = JSON.parse(e.data);
        console.log('onmessage(): ', data);
        document.querySelector('#chat__log').value = data.message + '\n' + document.querySelector('#chat__log').value;
    };

    LiveConnSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
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
                'type': 'ludo_message',
                'message': chatMessage
            };

            LiveConnSocket.send(JSON.stringify(messageContent));

            messageInput.value = ''; // Clean input field
        });

    document.getElementById("game__stop_game_button")
        .addEventListener("click", event => eventsFunCollector.stopGameEvent(event));

    document.getElementById("create_room__submit_button")
        .addEventListener("click", event => eventsFunCollector.createRoomEvent(event));

    document.getElementById("join_room__submit_button")
        .addEventListener("click", event => eventsFunCollector.joinRoomEvent(event));
}