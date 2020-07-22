export function gameViewState() {
    document.getElementById("create_room__container").classList.add("d-none");
    document.getElementById("join_room__container").classList.add("d-none");


    document.getElementById("room_name__header").classList.remove("d-none");
    document.getElementById("room_name__title").textContent = sessionStorage.getItem("roomName");

    document.getElementById("chat__container").classList.remove("d-none");

    document.getElementById("player_data__container").classList.remove("d-none");
    document.querySelector("#player_data__value_room_name div:first-child").textContent = sessionStorage.getItem("roomName");
    document.querySelector("#player_data__value_player_username div:first-child").textContent = sessionStorage.getItem("playerUsername");
    document.querySelector("#player_data__value_token div:first-child").textContent = sessionStorage.getItem("token");
    let isAdmin = sessionStorage.getItem("isAdmin");
    document.querySelector("#player_data__value_is_admin div:first-child").textContent = isAdmin;
    document.querySelector("#player_data__value_is_player div:first-child").textContent = sessionStorage.getItem("isPlayer");
    document.querySelector("#player_data__value_color div:first-child").textContent = sessionStorage.getItem("color");

    document.getElementById("game__container").classList.remove("d-none");
    if(isAdmin == 'true') {
        console.log('[gameState()] enabling')
        document.getElementById("game__stop_game_button").disabled = false;
    }
}