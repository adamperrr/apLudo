export function displayCreationViewErrors(errors_div_id, errors) {
    let errors_div = document.getElementById(errors_div_id);
    errors_div.innerHTML = ''; // Remove all child elements of old error list

    let ul = document.createElement('ul');
    ul.classList.add('list-group', 'm-2');

    errors.forEach(function(entry) {
        let li = document.createElement("li");
        li.classList.add('list-group-item', 'list-group-item-danger');

        let li_text = document.createTextNode(entry);
        li.appendChild(li_text);
        ul.appendChild(li);
    });

    errors_div.appendChild(ul);
    errors_div.classList.remove("d-none");
}