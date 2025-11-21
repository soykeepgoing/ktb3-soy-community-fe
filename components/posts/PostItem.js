import { getTitle, getCount, fromCreatedAt } from "../../utils/formatUtils.js";
import {navigateTo} from "../../core/router.js"

export function PostItem(data){
    const title = getTitle(data.title);
    const likeCount = getCount(data.statsLikeCounts);
    const commentCount = getCount(data.statsCommentCounts);
    const viewCount = getCount(data.statsViewCounts);
    const createdAt = fromCreatedAt(data.createdAt);
    const post = document.createElement("div");
    post.classList.add("post-card");
    post.innerHTML = `
    <h3>${title}</h3>
    <div class="post-meta">
        <p>좋아요 ${likeCount} 댓글 ${commentCount} 조회수 ${viewCount}</p>
        <p>${createdAt}</p>
    </div>
    <hr/>
    <div class="author">
        <img class="profile-img" id="profile-img" src="${data.userProfileImgUrl}"/>
        <span>${data.userNickname}</span>
    </div>
    `;
    post.addEventListener("click", () => navigateTo(`/posts/${data.id}`));

    return post;
}