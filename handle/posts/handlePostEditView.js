import { handlePostDetailView } from "./handlePostDetailView.js";
import { PostEdit } from "../../components/posts/PostEdit.js";
import { handlePostEdit } from "./handlePostEdit.js";
import {navigateTo} from "../../router/router.js";
import { showToast } from "../../components/users/Toast.js";

export async function handlePostEditView(postId) {
    const data = await handlePostDetailView(postId);

    if(data.userNickname !== localStorage.getItem("userNickname")){
        alert("작성한 게시글이 아닙니다.");
        navigateTo(`/posts/${postId}`);
        return;
    }

    const article = PostEdit(data);

    const btnPostEdit = article.querySelector("#btn-post-edit");
        btnPostEdit.addEventListener("click", async (event) => {
        handlePostEdit(event, postId);
        navigateTo(`/posts/${postId}`);
    });

    return article;
}