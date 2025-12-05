import { navigateTo } from "../../core/router.legacy.js";

export function FloatingButton({value, url}){
    const div = document.createElement("div");
    div.id = "postView__floatingBtn";
    div.classList.add("floatingBtn__link_to_post_create"); 
    div.innerHTML = value;
    div.addEventListener("click", () => navigateTo(url));
    return div;
}