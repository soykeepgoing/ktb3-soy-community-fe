import { handleDeleteComments } from "../../handle/handleDeleteComments.js";
import { handleCommentEdit } from "../../handle/handleCommentEdit.js";

export function CommentItem(data, postId){
    const modalDeleteMsg = "댓글을 삭제하시겠습니까?";
    console.log(data);
    const commentId = data.id;
    const item = document.createElement("div");
    item.classList.add("comment-item");

    item.innerHTML = `
        <div class="comment-header">
            <img class="profile-img" src="${data.userProfileImgUrl}">
            <span class="author-name">${data.userNickname}</span>
            <span class="comment-date">${data.createdAt}</span>
        </div>

        <p class="comment-body">${data.body}</p>

        <button id="btn-comment-edit" class="btn-comment-edit">수정</button>
        <button id="btn-comment-delete" class="btn-comment-delete">삭제</button>
    `;


    const btnCommentEdit = item.querySelector("#btn-comment-edit");
    btnCommentEdit.addEventListener("click", () => handleCommentEdit(data, postId, commentId));

    const btnCommentDelete = item.querySelector("#btn-comment-delete");
    btnCommentDelete.addEventListener("click", () => handleDeleteComments(modalDeleteMsg, postId, commentId));

    return item;
}