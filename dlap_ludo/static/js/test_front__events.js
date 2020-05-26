import {changeContainersState, displayErrors, errorsFromResponseBodyToArray} from './test_front__functions.js'
import * as promisesCollector from './test_front__promises.js'

export function assignWebSocketEvents(room_name) {
    const roomName = encodeURIComponent(room_name);
    const connWebSocket = new WebSocket(`ws:\/\/${window.location.host}\/ws\/room\/${roomName}\/`);

    connWebSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data);
        if(data.type == 'game_message' && data.message == "changeContainersState") {
            changeContainersState();
        }
        else if(data.type == 'game_message' && data.message == "stopServer") {
            changeContainersState();
            alert('Game stopped by room admin.')
        }
        else {
            document.querySelector('#chat__log').value = data.message + '\n' + document.querySelector('#chat__log').value;
        }
    };

    connWebSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    document.querySelector('#chat__message_input').onkeyup = function(e) {
        if (e.keyCode === 13) { document.getElementById("chat__send_button").click(); }
    };

    document.getElementById("chat__send_button")
        .addEventListener("click", event => {
            const messageInput = document.querySelector('#chat__message_input');
            const chatMessage = messageInput.value;

            if(chatMessage == "") { return; }

            const messageContent = {
                'type': 'chat_message',
                'message': chatMessage
            };

            connWebSocket.send(JSON.stringify(messageContent));

            messageInput.value = ''; // Clean input field
        });

    document.getElementById("game__stop_game_button")
        .addEventListener("click", event => eventsFunCollector.stopGameEvent(event, connWebSocket));
}

export function stopGameEvent(event, connWebSocket) {
    event.preventDefault()

    let request_message = {
        'token': sessionStorage.getItem("token"),
        'player_username': sessionStorage.getItem("playerUsername")
    };

    promisesCollector.stopGamePromise(request_message)
    .then(
        r =>  r.json().then(
            data => ({ok: r.ok, status: r.status, body: data})
        )
    )
    .then(response => {
        if(response.ok) {
            alert("Game stopped (see console)");
            sessionStorage.clear();
            changeContainersState();

            const wsMessageContent = {
                'type': 'game_message',
                'message': 'stopServer'
            };
            connWebSocket.send(JSON.stringify(wsMessageContent));
        }
        else {
            console.error("[stopGameEvent (!response.ok)]", response);
        }
    })
    .catch(error => {
        // Won't catch statuses 400, 404, 500 - it's only for connection errors
        console.error("[stopGameEvent (catch)]", error);
     });
}

export function createRoomEvent(event) {
    event.preventDefault()
    let errors = [];

    // Validate variables
    let room_name = document.getElementById("create_room__room_name").value.trim();
    if(room_name === "") { errors.push("Room name can't be empty.") }
    let is_private = document.getElementById("create_room__is_private_room").checked;
    let admin_player_username = document.getElementById("create_room__admin_player_username").value.trim();
    if(admin_player_username === "") { errors.push("Player username can't be empty.") }

    if(errors.length > 0) {
        displayErrors("create_room__errors", errors);
    } else {
        let request_message = {
            "is_private_room": is_private,
            "room_name": room_name,
            "admin_player_username": admin_player_username
        };

        promisesCollector.createRoomPromise(request_message)
        .then(
            r =>  r.json().then(
                data => ({ok: r.ok, status: r.status, body: data})
            )
        )
        .then(response => {
            if(response.ok) {
                alert("Room created (see console)");

                sessionStorage.setItem("roomName", room_name);
                sessionStorage.setItem("token", response.body.token);
                sessionStorage.setItem("playerUsername", admin_player_username);
                sessionStorage.setItem("color", response.body.color);
                sessionStorage.setItem("isPlayer", response.body.is_player);
                sessionStorage.setItem("isAdmin", response.body.is_admin);

                assignWebSocketEvents(room_name);
                changeContainersState();
            }
            else {
                let errors = errorsFromResponseBodyToArray(response.body);
                displayErrors("create_room__errors", errors);
                console.error("[createRoomEvent (!response.ok)]", response);
            }
        })
        .catch(error => {
             // Won't catch statuses 400, 404, 500 - it's only for connection errors
            console.error("[createRoomEvent (catch)]", error);
        });
    }
}

export function joinRoomEvent(event) {
    event.preventDefault()
    let errors = [];

    // Validate variables
    let room_name = document.getElementById("join_room__room_name").value.trim();
    if(room_name === "") { errors.push("Room name can't be empty.") }
    let player_username = document.getElementById("join_room__player_username").value.trim();
    if(player_username === "") { errors.push("Player username can't be empty.") }

    if(errors.length > 0) {
        displayErrors("join_room__errors", errors);
    }
    else{
        let request_message = {
            "room_name": room_name,
            "player_username": player_username
        };

        promisesCollector.joinRoomPromise(request_message)
        .then(
            r =>  r.json().then(
                data => ({ok: r.ok, status: r.status, body: data})
            )
        )
        .then(response => {
            if(response.ok) {
                alert("Joined room");

                sessionStorage.setItem("roomName", room_name);
                sessionStorage.setItem("token", response.body.token);
                sessionStorage.setItem("playerUsername", player_username);
                sessionStorage.setItem("color", response.body.color);
                sessionStorage.setItem("isPlayer", response.body.is_player);
                sessionStorage.setItem("isAdmin", response.body.is_admin);

                assignWebSocketEvents(room_name);
                changeContainersState();
            }
            else {
                let errors = errorsFromResponseBodyToArray(response.body);
                displayErrors("join_room__errors", errors);
                console.error("[joinRoomEvent (!response.ok)]", response);
            }
        })
        .catch(error => {
             // Won't catch statuses 400, 404, 500 - it's only for connection errors
            console.error("[joinRoomEvent (catch)]", error);
        });
    }
}