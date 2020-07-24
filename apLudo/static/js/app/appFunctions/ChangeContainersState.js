import {checkTokenPromise} from '../AppPromises.js'
import {gameViewState} from './GameViewState.js'
import {creationViewState} from './CreationViewState.js'
import createAppWebSocket from '../AppWebSocket.js'

export function changeContainersState() {
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

                const appWebSocket = createAppWebSocket(() => {
                    appWebSocket.send(JSON.stringify(wsContentMessage));
                });

                gameViewState();
            }
            else {
                creationViewState();
                sessionStorage.clear();
                // TODO:
//                const appWebSocket = createAppWebSocket(() => {
//                    appWebSocket.close();
//                });
            }
        }
        else {
            console.error("[changeContainersState (!response.ok)]", response);
        }
    })
    .catch(error => {
        // Won't catch statuses 400, 404, 500 - it's only for connection errors
        console.error("[changeContainersState (catch)]", error);
     });
}