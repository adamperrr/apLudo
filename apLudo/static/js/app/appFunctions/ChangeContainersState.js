import {checkTokenPromise} from '../AppPromises.js'
import {gameViewState} from './GameViewState.js'
import {creationViewState} from './CreationViewState.js'

export function changeContainersState(connWebSocket) {
console.dir("_________________________________");
console.dir("_________________________________");
console.dir("_________________________________");
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
                let wsMessage = { 'type': 'update_board', 'message': requestMessage };
                connWebSocket.send(JSON.stringify(wsMessage));
                gameViewState();
            }
            else {
                creationViewState();
                sessionStorage.clear();
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