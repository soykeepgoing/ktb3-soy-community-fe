import { h } from "../../../core/vdom/h.js";

export function PostLikeButton({isUserLiked = false, onToggle}){
    const likedClass = isUserLiked ? "liked" : "disliked";

    return h("button", 
        {
            className: ["post-like-button", likedClass], 
            onClick: onToggle
        },
        "❤️"
    );
}
