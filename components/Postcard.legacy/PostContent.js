import {h} from "../../core/Renderer.js";

export function PostContent(text) {
    return h("p", { class: "postContent" }, text); 
}
