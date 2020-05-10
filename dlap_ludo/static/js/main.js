document.getElementById("create_room__submit_button").addEventListener("click", function(event) {
    event.preventDefault()

    let errors_div = document.getElementById("create_room__errors");
    errors_div.innerHTML = ''; // Remove all child elements - old error list
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
        request_message = {
            "is_private_room": is_private,
            "room_name": room_name,
            "admin_player_username": admin_player_username
        };

        fetch('http://127.0.0.1:8000/game/create_room/', {
            method: "post",
            headers: new Headers(
                {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'}
            ),
            body: JSON.stringify(request_message)
        })
        .then(res => res.json())
        .then(res => {
            console.log("Dodałem użytkownika:");
            console.log(res);
        });
    }
});

document.getElementById("join_room__submit_button").addEventListener("click", function(event) {
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
});