import {checkTokenPromise} from '../AppPromises.js'
import {gameState} from './GameState.js'
import {creationState} from './CreationState.js'

export function changeContainersState() {
    let tokenOk = false;
    let request_message = {
        'player_username': sessionStorage.getItem("playerUsername"),
        'token': sessionStorage.getItem("token")
    };

    checkTokenPromise(request_message)
    .then(response => {
        if(response.ok) {
            tokenOk = response.body.token_ok;
            if(tokenOk) {
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