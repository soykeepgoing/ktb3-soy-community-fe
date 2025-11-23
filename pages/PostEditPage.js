import { handlePostEditView } from "../handle/posts/handlePostEditView.js";

export function PostEditPage(postId) {
    const container = document.createElement("section");
    handlePostEditView(postId).then(postEdit => {
        container.appendChild(postEdit);
    });

    return container;
}
