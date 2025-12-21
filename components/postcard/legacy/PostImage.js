import {h} from "../../core/Renderer.js";

export function PostImage(src) {
    if (!src) return null;
    return h("img", { class: "postImage", src });
}
