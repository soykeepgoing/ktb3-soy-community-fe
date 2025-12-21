import {loadPostDetail} from "../../handle/posts/PostEventHandler.js";
import {PostEdit} from "../../components/Posts/PostEdit.js";
import { handlePostEdit } from "../../handle/posts/PostEventHandler.js";
import { FloatingButton } from "../../components/FloatingButton/FloatingButton.js";

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

    const floatingBtn = FloatingButton({value: "🏠", url: "/posts"});
    container.appendChild(floatingBtn);

    return container;
}