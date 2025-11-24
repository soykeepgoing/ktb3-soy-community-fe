import { h } from "../../core/Renderer.js";
import { handlePostLike } from "../../handle/posts/PostEventHandler.js";
import { fromCreatedAt } from "../../utils/formatUtils.js";

export function PostMeta(authorNickname, authorProfileImgUrl, createdAt, postId ){
    return h(
        "div", 
        {class: "postMeta"}, 
        h("div", {class: "authorMeta"}, 
            h("img", {src: authorProfileImgUrl}),
            h("span", {class: "nickname"}, authorNickname),
        ),
        h("button", {class: "likeButton", onClick: async() => {await handlePostLike(postId)}}, "❤️"),
        h("span", {class: "createdAt"}, fromCreatedAt(createdAt))
    );
}