import { Modal } from "../../components/Modal/Modal.js";
import { navigateTo } from "../../core/router.js";
import {getPostDetail, deletePost, editPost, postImageFile} from "../../api/postApi.js"

class PostEventHandler{
    constructor(){}

    loadPostDetail(postId){
        const userId = localStorage.getItem("userId");
        return getPostDetail(postId, userId).then(data => data)
        .catch(error => {
            console.error(error)
        });
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

        const userId = localStorage.getItem("userId");

        btnConfirm.addEventListener("click", async () => {
            await deletePost(postId, userId);
            modal.remove();
            navigateTo("/posts");
        })
    }

    async handlePostEdit(event, postId){
        event.preventDefault();

        const postBody = document.querySelector("#post-body").value;
        const postImgFile = document.querySelector("#post-img");

        const newPost = {"postContent": postBody};
        const userId = localStorage.getItem("userId");

        await editPost(newPost, postId, userId);
        
        if (postImgFile.files.length > 0){
            const file = postImgFile.files[0];
            await postImageFile(postId, file);
            navigateTo(`/posts/${postId}`);
        } else {
            navigateTo(`/posts/${postId}`);
        }
        
    }

}

const postEventHandler = new PostEventHandler();
export const loadPostDetail = postEventHandler.loadPostDetail.bind(postEventHandler);
export const handlePostDelete = postEventHandler.handlePostDelete.bind(postEventHandler);
export const handlePostEdit = postEventHandler.handlePostEdit.bind(postEventHandler);