import { h } from "../../../core/vdom/h.js";

export function PostItemNickname(nickname){
    return h("p", {className: "postItem-nickname"}, nickname);
}