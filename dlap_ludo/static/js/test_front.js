import * as funCollector from './test_front__functions.js';
import * as eventsCollector from './test_front__assign_events.js';

funCollector.changeContainersState();
eventsCollector.assignEvents();

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
const roomName = encodeURIComponent(sessionStorage.getItem("roomName"));

const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/chat/' + roomName + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#chat__log').value = data.message + '\n' + document.querySelector('#chat__log').value;
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.getElementById("chat__send_button")
    .addEventListener("click", event => {
        const messageInput = document.querySelector('#chat__message_input');
        const chatMessage = messageInput.value;

        chatSocket.send(JSON.stringify({
            'message': chatMessage
        }));
        messageInputDom.value = '';
    });
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////