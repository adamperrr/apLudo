import {changeContainersState} from '../appFunctions/index.js'
import {stopGamePromise} from '../AppPromises.js'
import createAppWebSocket from '../AppWebSocket.js'

export function stopGame(event) {
    event.preventDefault()

    let request_message = {
        'token': sessionStorage.getItem("token"),
        'player_username': sessionStorage.getItem("playerUsername")
    };

    stopGamePromise(request_message)
    .then(response => {
        if(response.ok) {
            const wsContentMessage = {
                'type': 'game_message',
                'message': 'stopServer'
            };

            const appWebSocket = createAppWebSocket(() => {
                appWebSocket.send(JSON.stringify(wsContentMessage));
            });

            sessionStorage.clear();

            changeContainersState();

            alert("Game stopped (see console)");
        }
        else {
            console.error("[stopGame (!response.ok)]", response);
        }
    })
    .catch(error => {
        // Won't catch statuses 400, 404, 500 - it's only for connection errors
        console.error("[stopGame (catch)]", error);
     });
}