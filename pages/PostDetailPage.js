import { CommentSection } from "../components/comments/CommentSection.js";
import { PostCard } from "../components/postcard/PostCard.js";
import { createDom } from "../core/renderer.js";
import {loadPostDetail} from "../handle/posts/PostEventHandler.js";

export function PostDetailPage(postId) {
    const container = document.createElement("section");
    container.classList.add("postDetailPage");

    let cardDom = null;
    loadPostDetail(postId).then(data => {      
        const card = PostCard(data);
        cardDom = createDom(card);
        container.appendChild(cardDom);
    }).then(() => {
        const commentSection = CommentSection(postId);
        container.appendChild(createDom(commentSection));
    })

    return container;
}