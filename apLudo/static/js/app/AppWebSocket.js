import {changeContainersState} from './appFunctions/index.js'
import {stopGame} from './appEvents/index.js'

export default function createAppWebSocket(onOpenFunc) {
    let roomName = sessionStorage.getItem("roomName");

    if(roomName === null) {
        // console.dir("appWebSocket(): roomName not set"); // Don't display
        return;
    }

    roomName = encodeURIComponent(roomName);
    const appWebSocket = new WebSocket(`ws:\/\/${window.location.host}\/ws\/room\/${roomName}\/`);

    appWebSocket.onopen = (event) => {
        onOpenFunc();
    };

    appWebSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if(data.type === 'game_message' && data.message === "changeContainersState") {
            changeContainersState();
        }
        else if(data.type === 'game_message' && data.message === "stopServer") {
            changeContainersState();
            alert('Game stopped by room admin.')
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