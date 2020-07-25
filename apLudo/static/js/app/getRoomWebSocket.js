import {changeViewState} from './appFunctions/index.js'
import {stopGame} from './appEvents/index.js'
import {wsRoomUrlPattern} from './properties.js'

export default function getRoomWebSocket(onOpenCallback) {
    const roomName = sessionStorage.getItem("roomName");

    if(roomName === null) {
        // console.dir("appWebSocket(): roomName not set"); // Don't display
        return;
    }

    const uriRoomName = encodeURIComponent(roomName);
    const wsRoomUrl = wsRoomUrlPattern + '/' + uriRoomName + '/';
    const appWebSocket = new WebSocket(wsRoomUrl);

    appWebSocket.onopen = (event) => {
        onOpenCallback();
    };

    appWebSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if(data.type === 'game_message' && data.message === "changeContainersState") {
            changeViewState();
        }
        else if(data.type === 'game_message' && data.message === "stopServer") {
            changeViewState();
            console.log('Game stopped by room admin.')
        }
        else if(data.type === 'update_board') {
            console.dir(data.message); // TODO: something
        }
        else {
            document.querySelector('#chat__log').value = data.message + '\n' + document.querySelector('#chat__log').value;
        }
    };

    appWebSocket.onclose = (event) => {
        // console.error('Chat socket closed unexpectedly.'); // Don't display
    };

    return appWebSocket;
}