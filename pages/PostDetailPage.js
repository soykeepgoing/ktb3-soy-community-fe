import { CommentSection } from "../components/Comments/CommentSection.js";
import { PostCard } from "../components/postcard/PostCard.js";
import { createDom } from "../core/renderer.js";
import {loadPostDetail} from "../handle/posts/PostEventHandler.js";
import { PostCardDropDown } from "../components/postcard/PostCardDropDown.js";

export function PostDetailPage(postId) {
    const container = document.createElement("section");
    container.classList.add("postDetailPage");
    let cardDom = null;
    loadPostDetail(postId).then(data => {    
        console.log(data);
        const card = PostCard(data);
        const cardDrop = PostCardDropDown(postId);
        cardDom = createDom(card);
        cardDom.appendChild(cardDrop);
        container.appendChild(cardDom);
    }).then(() => {
        const commentSection = CommentSection(postId);
        container.appendChild(createDom(commentSection));
    })



    return container;
}