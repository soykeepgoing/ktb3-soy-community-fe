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

}

const postEventHandler = new PostEventHandler();
export const loadPostDetail = postEventHandler.loadPostDetail.bind(postEventHandler);
export const handlePostDelete = postEventHandler.handlePostDelete.bind(postEventHandler);