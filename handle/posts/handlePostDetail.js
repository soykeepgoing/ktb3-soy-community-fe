import { handlePostDetailView } from "./handlePostDetailView.js";
import { handleDeletePosts } from "../handleDeletePosts.js";
import { PostDetailComponent } from "../../components/posts/PostDetail.js";
import { navigateTo } from "../../router/router.js";

export async function handlePostDetail(postId) {
    const modalDeleteMsg = "게시글을 삭제하시겠습니까?";

    const data = await handlePostDetailView(postId);
    const article = PostDetailComponent(data); // UI 생성

    // 이벤트 바인딩
    article.querySelector("#btn-post-edit")
        .addEventListener("click", () => navigateTo(`/posts/${postId}/edit`));

    article.querySelector("#btn-post-delete")
        .addEventListener("click", () => handleDeletePosts(modalDeleteMsg, postId));

    return article;
}
