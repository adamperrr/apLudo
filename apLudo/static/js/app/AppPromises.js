export function templatePromise(url, request_message) {
    let header = new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
    });

    return fetch(url, {
        method: "post",
        headers: header,
        body: JSON.stringify(request_message)
    })
    .then(
        r =>  r.json().then(
            data => ({ok: r.ok, status: r.status, body: data})
        )
    );
}

export function checkTokenPromise(request_message) {
    let url = 'http://127.0.0.1:8000/game/check_token/';
    return templatePromise(url, request_message);
}

export function stopGamePromise(request_message) {
    let url = 'http://127.0.0.1:8000/game/stop_game/';
    return templatePromise(url, request_message);
}

export function createRoomPromise(request_message) {
    let url = 'http://127.0.0.1:8000/create_room/';
    return templatePromise(url, request_message);
}

export function joinRoomPromise(request_message) {
    let url = 'http://127.0.0.1:8000/join_room/';
    return templatePromise(url, request_message);
}