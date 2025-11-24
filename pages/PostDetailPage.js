import { CommentSection } from "../components/Comments/CommentSection.js";
import { PostCard } from "../components/postcard/PostCard.js";
import { createDom } from "../core/Renderer.js";
import {loadPostDetail} from "../handle/posts/PostEventHandler.js";
import { PostCardDropDown } from "../components/postcard/PostCardDropDown.js";
import {attachCommentInputForm, loadCommentList} from "../handle/comments/CommentEventHandler.js";
import { getState } from "../core/GlobalStore.js";

export function PostDetailPage(postId) {
    const container = document.createElement("section");
    container.classList.add("postDetailPage");
    let cardDom = null;
    loadPostDetail(postId).then(data => {    
        console.log(data);
        const card = PostCard(data);
        cardDom = createDom(card);
        if (data.userNickname === getState("userNickname")){
            const cardDrop = PostCardDropDown(postId);
            cardDom.appendChild(cardDrop);
        }
        container.appendChild(cardDom);
    }).then(() => {
        const commentSection = CommentSection(postId);
        const commentSectionDom = createDom(commentSection);
        container.appendChild(commentSectionDom);
        loadCommentList(postId);
    }).then(async () => {
        await attachCommentInputForm(postId);
    })
    return container;
}