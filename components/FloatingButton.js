import { navigateTo } from "../core/Router.js";

export function FloatingButton(){
    const div = document.createElement("div");
    div.id = "postView__floatingBtn";
    div.classList.add("floatingBtn__link_to_post_create"); 
    div.innerHTML = "+";
    div.addEventListener("click", () => navigateTo("/posts/create"));
    return div;
}