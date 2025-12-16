import { useState } from "../../../core/hooks/useState.js";
import { h } from "../../../core/vdom/h.js";
import { handleLikePost } from "../../../handlers/posts/handleLikePost.js";

export function PostLikeButton({isUserLiked, postId}){
    const [liked, setLiked] = useState(isUserLiked);

    const handleClick = async () => {
        const res = await handleLikePost({isUserLiked: liked, postId});
        if (res?.success) setLiked(prev => !prev);
    }

    const likedClass = liked ? "liked" : "disliked";

    return h("button", 
        {
            className: ["post-like-button", likedClass], 
            onClick: handleClick
        },
        "❤️"
    );
}