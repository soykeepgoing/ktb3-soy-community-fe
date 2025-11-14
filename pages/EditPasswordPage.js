import {EditPassword} from "../components/users/EditPassword.js"

export function EditPasswordPage(){
    const div = document.createElement("div");
    const section = EditPassword();
    div.appendChild(section);
    return div;
}