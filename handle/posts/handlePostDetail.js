import { handlePostDetailView } from "./handlePostDetailView.js";
import { handlePostDelete } from "../../handle/posts/handlePostDelete.js";
import {handlePostLike} from "../../handle/posts/handlePostLike.js"
import { PostDetail } from "../../components/posts/PostDetail.js";
import { navigateTo } from "../../router/router.js";

export async function handlePostDetail(postId) {
    const modalTitleMsg = "게시글을 삭제하시겠습니까?";
    const modalContentMsg = "삭제한 글은 복구할 수 없습니다.";

    const data = await handlePostDetailView(postId);
    const article = PostDetail(data); 

    article.querySelector("#btn-post-edit")
        .addEventListener("click", () => navigateTo(`/posts/${postId}/edit`));

    article.querySelector("#btn-post-delete")
        .addEventListener("click", () => handlePostDelete(modalTitleMsg, modalContentMsg, postId));

    article.querySelector("#btn-likes")
        .addEventListener("click", function (){ handlePostLike(this, postId)});

    return article;
}
