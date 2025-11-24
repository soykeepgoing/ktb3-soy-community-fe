import {loadPostDetail} from "../handle/posts/PostEventHandler.js";
import {PostEdit} from "../components/posts/PostEdit.js";
import { handlePostEdit } from "../handle/posts/PostEventHandler.js";
import { navigateTo } from "../core/router.js";
export function PostEditPage(postId) {
    const container = document.createElement("section");
    loadPostDetail(postId).then(data => {
        const postEditCard = PostEdit(data);
        const btnPostEdit = postEditCard.querySelector("#btn-post-edit");
            btnPostEdit.addEventListener("click", async (event) => {
            await handlePostEdit(event, postId);
        });
        container.appendChild(postEditCard);
    });

    return container;
}