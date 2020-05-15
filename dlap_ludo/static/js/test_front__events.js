import {changeContainersState, displayErrors, errorsFromResponseBodyToArray} from './test_front__functions.js'
import * as promisesCollector from './test_front__promises.js'

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
                'message': 'stop'
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
            console.log(response);
            if(response.ok) {
                alert("Room created (see console)");

                sessionStorage.setItem("roomName", room_name);
                sessionStorage.setItem("token", response.body.token);
                sessionStorage.setItem("playerUsername", admin_player_username);
                sessionStorage.setItem("color", response.body.color);
                sessionStorage.setItem("isPlayer", response.body.is_player);
                sessionStorage.setItem("isAdmin", response.body.is_admin);

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

                changeContainersState();
            }
            else {
                let errors = errorsFromResponseBodyToArray(response.body);
                console.error("[joinRoomEvent (!response.ok)]", response);
            }
        })
        .catch(error => {
             // Won't catch statuses 400, 404, 500 - it's only for connection errors
            console.error("[joinRoomEvent (catch)]", error);
        });
    }
}