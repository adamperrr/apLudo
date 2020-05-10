export function assignEvents() {
    document.getElementById("create_room__submit_button")
        .addEventListener("click", eventsCollector.createRoomEvent(event));

    document.getElementById("join_room__submit_button")
        .addEventListener("click", eventsCollector.joinRoomEvent(event));
}