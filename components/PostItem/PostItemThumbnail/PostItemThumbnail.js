import { h } from "../../../core/vdom/h.js";

export function PostItemThumbnail(imageUrl){
    return h("div", {className: "postItem-thumbnail"},
        h("img", {className: "data", src: imageUrl})
    );
}