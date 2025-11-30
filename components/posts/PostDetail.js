import {formatTime} from "../../utils/formatUtils.js";

export function PostDetail(data){
    const article = document.createElement("article");
    article.className = "post-detail";

    article.innerHTML = `
        <div class="post-header-row">

            <div class="post-header-left">
                <img class="author-img" src="${data.userProfileImgUrl}">
                <span class="author-name">${data.userNickname}</span>
                <span class="post-date">${formatTime(data.createdAt)}</span>
            </div>

            <div class="post-actions-buttons">
                <button id="btn-post-edit">수정</button>
                <button id="btn-post-delete">삭제</button>
            </div>

        </div>

        <div class="post-content">
            <img src=${data.imgUrl} alt="게시글 이미지" class="post-img">
            <p class="body-text"> ${data.body}</p>
        </div>

        <div class="stats">
            <button class="btn-likes" id="btn-likes">좋아요 ${data.statsLikeCounts}</button>
            <button id="btn-views">조회수 ${data.statsViewCounts}</button>
            <button id="btn-comments">댓글 ${data.statsCommentCounts}</button>
        </div>
    `;

    if (data.isUserLiked) {
        article.querySelector("#btn-likes").classList.add("liked");
    }


    return article;
}
