import { navigateTo } from "../../core/Router.js";

export function SignUpLink(){
    const div = document.createElement("div");
    div.classList.add("link_to");
    div.innerHTML = `Join the club`;
    div.onclick = () => navigateTo("/signup");
    return div;
}