import * as promisesCollector from './test_front__promises.js'

export function creationState() {
    document.getElementById("create_room__container").classList.remove("d-none");
    document.getElementById("join_room__container").classList.remove("d-none");

    document.getElementById("player_data__container").classList.add("d-none");
    document.getElementById("game__container").classList.add("d-none");
}

export function gameState() {
    document.getElementById("create_room__container").classList.add("d-none");
    document.getElementById("join_room__container").classList.add("d-none");

    document.getElementById("player_data__container").classList.remove("d-none");

    document.getElementById("player_data__value_player_username").textContent = sessionStorage.getItem("player_username");
    document.getElementById("player_data__value_token").textContent = sessionStorage.getItem("token");
    document.getElementById("player_data__value_is_admin").textContent = sessionStorage.getItem("is_admin") ? "FALSE" : "TRUE";
    document.getElementById("player_data__value_is_player").textContent = sessionStorage.getItem("is_player") ? "FALSE" : "TRUE";
    document.getElementById("player_data__value_color").textContent = sessionStorage.getItem("color");

    document.getElementById("game__container").classList.remove("d-none");
}

export function changeContainersState() {
    let tokenOk = false;
    let request_message = {
        'player_username': sessionStorage.getItem("player_username"),
        'token': sessionStorage.getItem("token")
    };

    promisesCollector.checkTokenPromise(request_message)
    .then(
        r =>  r.json().then(
            data => ({ok: r.ok, status: r.status, body: data})
        )
    )
    .then(response => {
        console.log(response);
        if(response.ok) {
            tokenOk = response.body.token_ok;

            if(tokenOk) {
                console.log('tokenOk: ' + tokenOk);

//                isAdmin = response.body.player.is_admin; // update is_admin to change admin in case admin left the room
//                sessionStorage.setItem("is_admin", isAdmin);

                gameState();
            }
            else {
                console.log('tokenOk: ' + tokenOk);
                creationState();
                sessionStorage.clear();
            }
        }
        else {
            // alert('ERROR (see console): ' + JSON.stringify(response.body));
        }
    })
    .catch(response => {
        // Won't catch statuses 400, 404, 500 - it's only for connection errors
        console.error("changeContainersState: Error catched");
     });
}
