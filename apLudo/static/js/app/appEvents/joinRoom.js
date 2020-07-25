import {changeViewState, displayCreationViewErrors, rewriteErrorsFromResponseBodyToArray} from '../appFunctions/index.js'
import {joinRoomPromise} from '../promises.js'

export function joinRoom(event) {
    event.preventDefault()
    let errors = [];

    // Validate variables
    let room_name = document.getElementById("join_room__room_name").value.trim();
    if(room_name === "") { errors.push("Room name can't be empty.") }
    let player_username = document.getElementById("join_room__player_username").value.trim();
    if(player_username === "") { errors.push("Player username can't be empty.") }

    if(errors.length > 0) {
        displayCreationViewErrors("join_room__errors", errors);
    }
    else{
        let request_message = {
            "room_name": room_name,
            "player_username": player_username
        };

        joinRoomPromise(request_message)
        .then(response => {
            if(response.ok) {
                console.log("Joined room");

                sessionStorage.setItem("roomName", room_name);
                sessionStorage.setItem("token", response.body.token);
                sessionStorage.setItem("playerUsername", player_username);
                sessionStorage.setItem("color", response.body.color);
                sessionStorage.setItem("isPlayer", response.body.is_player);
                sessionStorage.setItem("isAdmin", response.body.is_admin);

                changeViewState();
            }
            else {
                let errors = rewriteErrorsFromResponseBodyToArray(response.body);
                displayCreationViewErrors("join_room__errors", errors);
                console.error("[joinRoom (!response.ok)]", response);
            }
        })
        .catch(error => {
             // Won't catch statuses 400, 404, 500 - it's only for connection errors
            console.error("[joinRoom (catch)]", error);
        });
    }
}