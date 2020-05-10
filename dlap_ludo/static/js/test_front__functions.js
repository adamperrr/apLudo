export function changeContainersState() {
    console.log('changeContainersState')
    if(sessionStorage.getItem("token")) {
        document.getElementById("create_room__container").classList.add("d-none");
        document.getElementById("join_room__container").classList.add("d-none");
        document.getElementById("game__container").classList.remove("d-none");
    }
    else {
        document.getElementById("create_room__container").classList.remove("d-none");
        document.getElementById("join_room__container").classList.remove("d-none");
        document.getElementById("game__container").classList.add("d-none");
    }
}