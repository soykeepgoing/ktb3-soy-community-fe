export function PostDetailComponent(data){
    const article = document.createElement("article");
    article.className = "post-detail";

    article.innerHTML = `
        <h2>${data.title}</h2>

        <div class="post-header-row">

            <div class="post-header-left">
                <img class="author-img" src="${data.userProfileImgUrl}">
                <span class="author-name">${data.userNickname}</span>
                <span class="post-date">${data.createdAt}</span>
            </div>

            <div class="post-actions-inline">
                <button id="btn-post-edit">수정</button>
                <button id="btn-post-delete">삭제</button>
            </div>

        </div>

        <div class="post-content">
            <img src=${data.imgUrl} alt="게시글 이미지" class="post-img">
            <p class="body-text"> ${data.body}</p>
        </div>

        <div class="stats">
            <button>좋아요 ${data.statsLikeCounts}</button>
            <button>조회수 ${data.statsViewCounts}</button>
            <button>댓글 ${data.statsCommentCounts}</button>
        </div>
    `;

    return article;
}
