import { h } from "../../../core/vdom/h.js";

export function AuthorDetails({nickname, profileImgUrl}){
    return h("div", {className: "authorDetails"}, 
        h("img", {src: profileImgUrl}), 
        h("span", {className: "nickname"}, nickname)
    )
}