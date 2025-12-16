import { h } from "../../core/Renderer.js";
import { handlePostLike } from "../../handle/posts/PostEventHandler.js";
import { formatTime } from "../../utils/formatUtils.js";

export function PostMeta(authorNickname, authorProfileImgUrl, createdAt, postId, isUserLiked){
    const likeButtonClass = isUserLiked? ['likeButton', 'liked']: ['likeButton'];

    return h(
        "div", 
        {class: "postMeta"}, 
        h("div", {class: "authorMeta"}, 
            h("img", {src: authorProfileImgUrl}),
            h("span", {class: "nickname"}, authorNickname),
        ),
        h("button", {class: likeButtonClass, onClick: async() => {await handlePostLike(postId)}}, "❤️"),
        h("span", {class: "createdAt"}, formatTime(createdAt))
    );
}