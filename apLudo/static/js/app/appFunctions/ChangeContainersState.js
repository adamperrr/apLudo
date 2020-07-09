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
    .then(
        r =>  r.json().then(
            data => ({ok: r.ok, status: r.status, body: data})
        )
    )
    .then(response => {
        if(response.ok) {
            tokenOk = response.body.token_ok;
            if(tokenOk) {
                gameState();
            }
            else {
                creationState();
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