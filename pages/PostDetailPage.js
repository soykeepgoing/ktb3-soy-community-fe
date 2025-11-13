import { handlePostDetail } from "../handle/posts/handlePostDetail.js";

export function PostDetailPage(postId){
    const container = document.createElement("section");

    handlePostDetail(postId).then(article => {
        container.appendChild(article);
    });

    return container;
}
