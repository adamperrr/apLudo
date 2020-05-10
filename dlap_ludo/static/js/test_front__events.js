import {changeContainersState} from './test_front__functions.js'
import * as promisesCollector from './test_front__promises.js'

export function stopGameEvent(event) {
    event.preventDefault()

    let request_message = {
        'token': sessionStorage.getItem("token"),
        'player_username': sessionStorage.getItem("player_username")
    };

    console.log(request_message);

    promisesCollector.stopGamePromise(request_message)
    .then(
        r =>  r.json().then(
            data => ({ok: r.ok, status: r.status, body: data})
        )
    )
    .then(response => {
        console.log(response);
        if(response.ok) {
            alert("Game stopped (see console)");
            sessionStorage.clear();
            changeContainersState();
        }
        else {
            alert('ERROR (see console): ' + JSON.stringify(response.body));
        }
    })
    .catch(response => {
        // Won't catch statuses 400, 404, 500 - it's only for connection errors
        console.error("Error catched");
     });
}

export function createRoomEvent(event) {
    event.preventDefault()

    let errors_div = document.getElementById("create_room__errors");
    errors_div.innerHTML = ''; // Remove all child elements of old error list
    let errors = [];

    let room_name = document.getElementById("create_room__room_name").value.trim();
    if(room_name === "") { errors.push("Room name can't be empty.") }

    let is_private = document.getElementById("create_room__is_private_room").checked;

    let admin_player_username = document.getElementById("create_room__admin_player_username").value.trim();
    if(admin_player_username === "") { errors.push("Player username can't be empty.") }


    if(errors.length > 0) {
        let ul = document.createElement('ul');
        ul.classList.add('list-group', 'm-2');

        errors.forEach(function(entry) {
            let li = document.createElement("li");
            li.classList.add('list-group-item', 'list-group-item-danger');

            let li_text = document.createTextNode(entry);
            li.appendChild(li_text);
            ul.appendChild(li);
        });

        errors_div.appendChild(ul);
        errors_div.classList.remove("d-none");
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

                let token = response.body.token;
                let color = response.body.color;
                let isPlayer = response.body.is_player;
                let isAdmin = response.body.is_admin;

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("player_username", admin_player_username);
                sessionStorage.setItem("color", color);
                sessionStorage.setItem("isPlayer", isPlayer);
                sessionStorage.setItem("isAdmin", isAdmin);

                changeContainersState();
            }
            else {
                alert('ERROR (see console): ' + JSON.stringify(response.body));
            }
        })
        .catch(response => {
             // Won't catch statuses 400, 404, 500 - it's only for connection errors
             console.error(response)
        });
    }
}

export function joinRoomEvent(event) {
    event.preventDefault()

    let errors_div = document.getElementById("join_room__errors");
    errors_div.innerHTML = ''; // Remove all child elements - old error list
    let errors = [];

    let room_name = document.getElementById("join_room__room_name").value.trim();
    if(room_name === "") { errors.push("Room name can't be empty.") }

    let player_username = document.getElementById("join_room__player_username").value.trim();
    if(player_username === "") { errors.push("Player username can't be empty.") }


    if(errors.length > 0) {
        let ul = document.createElement('ul');
        ul.classList.add('list-group', 'm-2');

        errors.forEach(function(entry) {
            let li = document.createElement("li");
            li.classList.add('list-group-item', 'list-group-item-danger');

            let li_text = document.createTextNode(entry);
            li.appendChild(li_text);
            ul.appendChild(li);
        });

        errors_div.appendChild(ul);
        errors_div.classList.remove("d-none");
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
            console.log(response);
            if(response.ok) {
                alert("Joined room (see console)");

                let token = response.body.token;
                let color = response.body.color;
                let isPlayer = response.body.is_player;
                let isAdmin = response.body.is_admin;

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("player_username", player_username);
                sessionStorage.setItem("color", color);
                sessionStorage.setItem("isPlayer", isPlayer);
                sessionStorage.setItem("isAdmin", isAdmin);

                changeContainersState();
            }
            else {
                alert('ERROR (see console): ' + JSON.stringify(response.body));
            }
        })
        .catch(response => {
             // Won't catch statuses 400, 404, 500 - it's only for connection errors
             console.error(response)
        });
    }
}