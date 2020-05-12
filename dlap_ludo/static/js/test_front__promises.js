export function checkTokenPromise(request_message) {
    return fetch('http://127.0.0.1:8000/game/check_token/', {
        method: "post",
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        ),
        body: JSON.stringify(request_message)
    });
}

export function stopGamePromise(request_message) {
    return fetch('http://127.0.0.1:8000/game/stop_game/', {
        method: "post",
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        ),
        body: JSON.stringify(request_message)
    });
}

export function createRoomPromise(request_message) {
    return fetch('http://127.0.0.1:8000/create_room/', {
        method: "post",
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        ),
        body: JSON.stringify(request_message)
    });
}

export function joinRoomPromise(request_message) {
    return fetch('http://127.0.0.1:8000/join_room/', {
        method: "post",
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        ),
        body: JSON.stringify(request_message)
    });
}