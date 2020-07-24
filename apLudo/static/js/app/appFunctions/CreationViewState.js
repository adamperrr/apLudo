export function creationViewState() {
    // Creation stage view
    document.getElementById("create_room__container").classList.remove("d-none");
    document.getElementById("join_room__container").classList.remove("d-none");

    // Game play view
    document.getElementById("room_name__header").classList.remove("d-none");
    document.getElementById("room_name__header").classList.add("d-none");
    document.getElementById("chat__container").classList.add("d-none");
    document.getElementById("player_data__container").classList.add("d-none");
    document.getElementById("game__container").classList.add("d-none");
}