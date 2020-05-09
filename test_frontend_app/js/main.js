document.getElementById("create_room__submit_button").addEventListener("click", function(event) {
    event.preventDefault()
//    const errors_div = document.getElementById("create_room__error_message");
//    errors_div.textContent = "Error";
//    errors_div.classList.remove("d-none");

    let errors = [];

    let room_name = document.getElementById("create_room__room_name").value.trim();
    if(room_name === "") { errors.push("Room name can't be empty.") }

    let is_private = document.getElementById("create_room__is_private_room").checked;

    let admin_username = document.getElementById("create_room__admin_username").value.trim();
    if(room_name === "") { errors.push("Username can't be empty.") }


    if(errors.length > 0) {
        let errors_list = document.createElement("ul");
        errors.forEach(function(entry) {
            let errors_list_elem = document.createElement("li");
            errors_list_elem.textContent = entry;
            console.log(entry);
        });
    }
});

document.getElementById("join_room__submit_button").addEventListener("click", function(event) {
    event.preventDefault()
    const errors_div = document.getElementById("join_room__error_message");
    const room_name_field = document.getElementById("join_room__room_name");
    const admin_user_name_field = document.getElementById("join_room__username");

    console.dir([errors_div, room_name_field, admin_user_name_field]);
    console.log("Join room");
});