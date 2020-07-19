import {changeContainersState, displayErrors, errorsFromResponseBodyToArray} from '../appFunctions/index.js'
import {createRoomPromise} from '../AppPromises.js'
import {assignWebSocket} from './AssignWebSocket.js'

export function createRoom(event) {
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

        createRoomPromise(request_message)
        .then(response => {
            if(response.ok) {
                alert("Room created (see console)");

                sessionStorage.setItem("roomName", room_name);
                sessionStorage.setItem("token", response.body.token);
                sessionStorage.setItem("playerUsername", admin_player_username);
                sessionStorage.setItem("color", response.body.color);
                sessionStorage.setItem("isPlayer", response.body.is_player);
                sessionStorage.setItem("isAdmin", response.body.is_admin);

                assignWebSocket(room_name);
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