import {changeContainersState} from '../appFunctions/index.js'
import {stopGamePromise} from '../AppPromises.js'

export function stopGame(event, connWebSocket) {
    event.preventDefault()

    let request_message = {
        'token': sessionStorage.getItem("token"),
        'player_username': sessionStorage.getItem("playerUsername")
    };

    stopGamePromise(request_message)
    .then(
        r =>  r.json().then(
            data => ({ok: r.ok, status: r.status, body: data})
        )
    )
    .then(response => {
        if(response.ok) {
            const wsMessageContent = {
                'type': 'game_message',
                'message': 'stopServer'
            };

            connWebSocket.send(JSON.stringify(wsMessageContent));
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