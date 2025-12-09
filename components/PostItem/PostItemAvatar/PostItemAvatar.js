import { h } from "../../../core/vdom/h.js";

export function PostItemAvatar(imgUrl) {
    return h("div", { className: "postItem-avatar" }, 
        h("img", { className: "img", src: imgUrl, alt: "User Avatar" })
    );
}