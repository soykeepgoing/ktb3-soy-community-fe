import {EditPassword} from "../components/users/EditPassword.js"
import { attachEditPassword } from "../handle/users/UserEventHandler.js";

export function EditPasswordPage(){
    const div = document.createElement("div");
    div.classList.add("editPasswordPage");
    const section = EditPassword();
    attachEditPassword(section);
    div.appendChild(section);
    return div;
}