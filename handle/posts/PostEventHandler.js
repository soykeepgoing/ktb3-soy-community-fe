import { Modal } from "../../components/Modal/Modal.js";
import { navigateTo } from "../../core/router.legacy.js";
import { getState } from "../../core/GlobalStore.js";
import {getPostDetail, deletePost, editPost, likePost, dislikePost} from "../../api/postApi.js"

class PostEventHandler{
    constructor(){}

    async loadPostDetail(postId){
        const response = await getPostDetail(postId);
        return response.data;
    }

    handlePostDelete(postId) {
        const modalTitleMsg = "게시글을 삭제하시겠습니까?";
        const modalContentMsg = "삭제한 글은 복구할 수 없습니다.";
        Modal(modalTitleMsg, modalContentMsg);

        const modal = document.getElementById("modal-delete");

        const btnConfirm = modal.querySelector("#btn-confirm");
        const btnCancel = modal.querySelector("#btn-cancel");

        btnCancel.addEventListener("click", 
            () => modal.remove()
        );

        btnConfirm.addEventListener("click", async () => {
            await deletePost(postId);
            modal.remove();
            navigateTo("/posts");
        })
    }

    async handlePostEdit(event, postId){
        event.preventDefault();

        const postBody = document.querySelector("#post-body").value;
        const postImgFile = document.querySelector("#post-img");

        const payload = { postContent: postBody };
        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(payload)], { type: "application/json" }));

        if (postImgFile.files.length > 0){
            const file = postImgFile.files[0];
            formData.append("postImgFile", file);
        }

        await editPost(postId, formData);
        navigateTo(`/posts/${postId}`);
    }

    async handlePostLike(postId){
        const btn = document.querySelector(".likeButton");
        const likeStats = document.querySelector(".postStatsLike");
        
        let response;

        if (btn.classList.contains("liked")){
            btn.classList.remove("liked");
            response = await dislikePost(postId);
        } else {
            btn.classList.add("liked");
            response = await likePost(postId);
        }
        if (response.success){
            const likeCount = response.data.likeCount;
            likeStats.textContent = `좋아요 ${likeCount}`;
        }

    }

}

const postEventHandler = new PostEventHandler();
export const loadPostDetail = postEventHandler.loadPostDetail.bind(postEventHandler);
export const handlePostDelete = postEventHandler.handlePostDelete.bind(postEventHandler);
export const handlePostEdit = postEventHandler.handlePostEdit.bind(postEventHandler);
export const handlePostLike = postEventHandler.handlePostLike.bind(postEventHandler);
