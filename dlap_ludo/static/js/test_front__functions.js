import * as promisesCollector from './test_front__promises.js'

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
                console.log('tokenOk: ' + tokenOk)
                document.getElementById("create_room__container").classList.add("d-none");
                document.getElementById("join_room__container").classList.add("d-none");
                document.getElementById("game__container").classList.remove("d-none");
            }
            else {
                console.log('tokenOk: ' + tokenOk)
                document.getElementById("create_room__container").classList.remove("d-none");
                document.getElementById("join_room__container").classList.remove("d-none");
                document.getElementById("game__container").classList.add("d-none");

                sessionStorage.clear();
            }
        }
        else {
            // alert('ERROR (see console): ' + JSON.stringify(response.body));
        }
    })
    .catch(response => {
        // Won't catch statuses 400, 404, 500 - it's only for connection errors
        console.error("Error catched");
     });
}

export function switchOffGameContainer() {
    console.log('Token ok: ' + tokenOk)
    document.getElementById("create_room__container").classList.remove("d-none");
    document.getElementById("join_room__container").classList.remove("d-none");
    document.getElementById("game__container").classList.add("d-none");
}