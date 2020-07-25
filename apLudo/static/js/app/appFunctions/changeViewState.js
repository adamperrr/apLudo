import {checkTokenPromise} from '../promises.js'
import {changeToGameViewState} from './changeToGameViewState.js'
import {changeToCreationViewState} from './changeToCreationViewState.js'
import getRoomWebSocket from '../getRoomWebSocket.js'

export function changeViewState() {
    let tokenOk = false;
    let requestMessage = {
        'player_username': sessionStorage.getItem("playerUsername"),
        'token': sessionStorage.getItem("token")
    };

    checkTokenPromise(requestMessage)
    .then(response => {
        if(response.ok) {
            tokenOk = response.body.token_ok;
            if(tokenOk) {
                const wsContentMessage = {
                    'type': 'update_board',
                    'message': requestMessage
                };

                const roomWebSocket = getRoomWebSocket(() => {
                    roomWebSocket.send(JSON.stringify(wsContentMessage));
                });

                changeToGameViewState();
            }
            else {
                changeToCreationViewState();
                sessionStorage.clear();
                // TODO:
//                const appWebSocket = createAppWebSocket(() => {
//                    appWebSocket.close();
//                });
            }
        }
        else {
            console.error("[changeViewState (!response.ok)]", response);
        }
    })
    .catch(error => {
        // Won't catch statuses 400, 404, 500 - it's only for connection errors
        console.error("[changeViewState (catch)]", error);
     });
}