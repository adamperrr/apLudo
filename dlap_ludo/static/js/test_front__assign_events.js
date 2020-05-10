import * as eventsFunCollector from './test_front__events.js'

export function assignEvents() {
    document.getElementById("game__stop_game_button")
        .addEventListener("click", event => eventsFunCollector.stopGameEvent(event));

    document.getElementById("create_room__submit_button")
        .addEventListener("click", event => eventsFunCollector.createRoomEvent(event));

    document.getElementById("join_room__submit_button")
        .addEventListener("click", event => eventsFunCollector.joinRoomEvent(event));
}