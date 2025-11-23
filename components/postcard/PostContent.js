import {h} from "../../core/renderer.js";

export function PostContent(text) {
    return h("p", { class: "postContent" }, text); 
}
