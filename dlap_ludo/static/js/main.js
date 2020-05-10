import * as eventsFunCollector from './main_events.js';
import * as funCollector from './main_fun.js';

funCollector.changeContainersState();

document.getElementById("create_room__submit_button")
    .addEventListener("click", event => eventsFunCollector.createRoomEvent(event));

document.getElementById("join_room__submit_button")
    .addEventListener("click", event => eventsFunCollector.joinRoomEvent(event));