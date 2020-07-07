import * as eventsCollector from './appEvents/index.js'
import {changeContainersState} from './test_front__functions.js'

(function(){
    // Assign events to buttons
    document.getElementById("create_room__submit_button")
        .addEventListener("click", event => eventsCollector.createRoom(event));
    document.getElementById("join_room__submit_button")
        .addEventListener("click", event => eventsCollector.joinRoom(event));
    window.addEventListener("load", event => changeContainersState());

    changeContainersState();
})();