// import { navigateTo } from "../../core/router.js";

export function SignUpLink(){
    const div = document.createElement("div");
    div.classList.add("link_to");
    div.innerHTML = `Join the club`;
    // div.onclick = () => navigateTo("/signup");
    return div;
}