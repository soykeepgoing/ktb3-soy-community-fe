import {EditPassword} from "../components/users/EditPassword.js"
import { attachEditPassword } from "../handle/users/handleEditPassword.js";

export function EditPasswordPage(){
    const div = document.createElement("div");
    const section = EditPassword();
    attachEditPassword(section);
    div.appendChild(section);
    return div;
}