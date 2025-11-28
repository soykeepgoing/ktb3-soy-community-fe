import {EditPassword} from "../components/Users/EditPassword.js";
import {FloatingButton} from "../components/FloatingButton/FloatingButton.js";
import { attachEditPassword } from "../handle/users/UserEventHandler.js";

export function EditPasswordPage(){
    const div = document.createElement("div");
    div.classList.add("editPasswordPage");
    const section = EditPassword();
    attachEditPassword(section);
    const floatingBtn = FloatingButton({value: "🏠", url: "/posts"});

    div.appendChild(section);
    div.appendChild(floatingBtn);
    return div;
}