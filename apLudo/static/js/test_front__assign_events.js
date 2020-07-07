import * as eventsFunCollector from './test_front__events.js'
import {changeContainersState} from './test_front__functions.js'

export function assignEvents() {
    document.getElementById("create_room__submit_button")
        .addEventListener("click", event => eventsFunCollector.createRoomEvent(event));

    document.getElementById("join_room__submit_button")
        .addEventListener("click", event => eventsFunCollector.joinRoomEvent(event));

    window.addEventListener('load', (event) => { changeContainersState(); });
}