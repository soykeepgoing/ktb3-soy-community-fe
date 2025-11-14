import { fromCreatedAt } from "../../utils/formatUtils.js";

export function CommentItem(data) {
    const item = document.createElement("div");
    item.classList.add("comment-item");
    item.innerHTML = `
        <div class="comment-header">
            <img class="profile-img" src="${data.userProfileImgUrl}">
            <span class="author-name">${data.userNickname}</span>
            <span class="comment-date">${fromCreatedAt(data.createdAt)}</span>
        </div>

        <p class="comment-body">${data.body}</p>

        <button class="btn-comment-edit">수정</button>
        <button class="btn-comment-delete">삭제</button>
    `;

    return item;
}
