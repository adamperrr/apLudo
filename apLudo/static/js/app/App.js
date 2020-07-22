import {createRoom, joinRoom} from './appEvents/index.js'
import {changeContainersState} from './appFunctions/index.js'

(function(){
    // Assign events to buttons
    document.getElementById("create_room__submit_button")
        .addEventListener("click", event => createRoom(event));
    document.getElementById("join_room__submit_button")
        .addEventListener("click", event => joinRoom(event));
    window.addEventListener("load", event => changeContainersState());

    changeContainersState();
})();