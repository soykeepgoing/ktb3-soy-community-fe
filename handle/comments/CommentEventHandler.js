import { getComments, createComment, deleteComments } from "../../api/commentApi.js";
import { CommentItem } from "../../components/Comments/CommentItem.js";
import {createDom} from "../../core/renderer.js";
import { Modal } from "../../components/Modal/Modal.js"
import {navigateTo} from "../../core/router.js";

class CommentEventHandler{
    constructor(){}

    loadCommentList(postId){
        const commentItemList = document.querySelector("#commentList");
        getComments(postId).then(commentList => {
            commentList.forEach(comment => {
                const commentItem = createDom(CommentItem(postId, comment));
                commentItemList.appendChild(commentItem);
        });
        });
    }

    async handleCommentCreate(postId){
        const commentTextArea = document.querySelector("#commentContent");
        const commentItemList = document.querySelector("#commentList");
        console.log(commentItemList);
        const commentContent = commentTextArea.value; 

        const commentData = {"commentContent": commentContent};
        const res = await createComment(commentData, postId);
        if (res.state){
            const newCommentItem = CommentItem(res, postId);
            const newCommentItemDom = createDom(newCommentItem);
            commentItemList.appendChild(newCommentItemDom);
            document.querySelector("#commentContent").value = "";
        }
        return res;
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
    
        const userId = localStorage.getItem("userId");
    
        btnConfirm.addEventListener("click", async () => {
            await deleteComments(postId, commentId, userId);
            modal.remove();
            navigateTo(`/posts/${postId}`);
        })
    }

}

const commentEventHandler = new CommentEventHandler();
export const loadCommentList = commentEventHandler.loadCommentList.bind(commentEventHandler);
export const handleCommentCreate = commentEventHandler.handleCommentCreate.bind(commentEventHandler);
export const handleCommentDelete = commentEventHandler.handleCommentDelete.bind(commentEventHandler);