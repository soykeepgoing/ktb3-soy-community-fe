import {navigateTo} from "../../core/router.legacy.js";
import {getState} from "../../core/GlobalStore.js";
import {createDom} from "../../core/Renderer.js";

import { getComments, createComment, deleteComments, editComment } from "../../api/commentApi.js";
import { CommentItem } from "../../components/Comments/CommentItem.js";
import { Modal } from "../../components/Modal/Modal.js"

class CommentEventHandler{
    constructor(){}

    async loadCommentList(postId){
        const commentItemList = document.querySelector("#commentList");
        const response = await getComments(postId);
        if (!response.success) return; 
        const commentList = response.data;
        commentList.forEach(comment => {
            const commentItem = createDom(CommentItem(postId, comment));
            commentItemList.appendChild(commentItem);
        });
    }

    async handleCommentCreate(postId){
        const commentTextArea = document.querySelector("#commentContent");
        const commentItemList = document.querySelector("#commentList");
        
        const commentContent = commentTextArea.value; 
        const commentData = {"commentContent": commentContent};
        const response = await createComment(commentData, postId);
        if (!response.success) return;

        const isCreated = true;
        const newCommentItem = CommentItem(postId, response.data, isCreated);
        const newCommentItemDom = createDom(newCommentItem);
        commentItemList.appendChild(newCommentItemDom);
        document.querySelector("#commentContent").value = "";
    }

    async handleCommentDelete(postId, commentId){
        const titleMsg = "댓글을 삭제하시겠습니까?";
        const contentMsg = "삭제한 내용은 복구 할 수 없습니다.";
    
        Modal(titleMsg, contentMsg);
    
        const modal = document.getElementById("modal-delete");
    
        const btnConfirm = modal.querySelector("#btn-confirm");
        const btnCancel = modal.querySelector("#btn-cancel");
    
        btnCancel.addEventListener("click", 
            () => modal.remove()
        );

        btnConfirm.addEventListener("click", async () => {
            await deleteComments(postId, commentId);
            modal.remove();
            navigateTo(`/posts/${postId}`);
        })
    }

    async attachCommentInputForm(postId){
        let activeHandler = null;
        const list = document.querySelector(".commentList");
        const form = document.querySelector(".commentInputForm");

        const btn = form.querySelector(".btn");
        const textarea = form.querySelector(".textarea");

        const createEventHandler = async (event) => {
            event.preventDefault();

            const inputValue = textarea.value; 
            if (!inputValue) return;

            await this.handleCommentCreate(postId);
        }
        activeHandler = createEventHandler;
        btn.addEventListener("click", activeHandler);

        form.enterEditMode = (item, commentId) => {
            const commentBody = item.querySelector(".body").textContent;
            
            btn.removeEventListener("click", activeHandler);

            textarea.value = commentBody;
            btn.textContent = "댓글 수정";

            const editEventHandler = async (event) => {
                event.preventDefault();
        
                const newCommentData = {
                    newCommentContent: textarea.value
                };
        
                const response = await editComment(newCommentData, postId, commentId);
                if (!response.success) return; 

                item.querySelector(".body").textContent = textarea.value;
    
                /*댓글 작성 모드로 바꾸기*/
                textarea.value = "";
                btn.textContent = "댓글 작성";
                
                btn.removeEventListener("click", activeHandler);
                activeHandler = createEventHandler;
                btn.addEventListener("click", activeHandler);

            };

            activeHandler = editEventHandler;
            btn.addEventListener("click", activeHandler);

        }
    }

    async handleCommentEdit(commentId){
        const item = document.querySelector(`.commentItem[data-comment-id="${commentId}"]`);
        const form = document.querySelector(".commentInputForm");
        await form.enterEditMode(item, commentId);

    }

}

const commentEventHandler = new CommentEventHandler();
export const loadCommentList = commentEventHandler.loadCommentList.bind(commentEventHandler);
export const handleCommentCreate = commentEventHandler.handleCommentCreate.bind(commentEventHandler);
export const handleCommentDelete = commentEventHandler.handleCommentDelete.bind(commentEventHandler);
export const attachCommentInputForm = commentEventHandler.attachCommentInputForm.bind(commentEventHandler);
export const handleCommentEdit = commentEventHandler.handleCommentEdit.bind(commentEventHandler);