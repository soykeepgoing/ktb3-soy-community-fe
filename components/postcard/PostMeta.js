import { h } from "../../core/renderer.js";
import { fromCreatedAt } from "../../utils/formatUtils.js";

export function PostMeta(authorNickname, authorProfileImgUrl, createdAt ){
    return h(
        "div", 
        {class: "postMeta"}, 
        h("div", {class: "authorMeta"}, 
            h("img", {src: authorProfileImgUrl}),
            h("span", {class: "nickname"}, authorNickname),
        ),
        h("span", {class: "createdAt"}, fromCreatedAt(createdAt))
    );
}