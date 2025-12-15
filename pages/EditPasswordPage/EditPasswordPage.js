import { FloatingButton } from "../../components/FloatingButton/FloatingButton.js";
import { EditPasswordSection } from "../../components/EditPasswordSection/EditPasswordSection.js";
import { h } from "../../core/vdom/h.js";

export function EditPasswordPage(){
    return h(
        "div", 
        {className: "edit-password-page"}, 
        h(EditPasswordSection, {}, ), 
        FloatingButton({
            value: "🏠", url: "/posts"
        })
    )
}