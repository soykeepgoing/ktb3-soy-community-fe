
import { handlePostDetailView } from "../../events/handlePostDetailView.js";
import { navigateTo } from "../../router/router.js";
import {handleDeleteContents} from "../../events/handleDeleteContents.js";

export function PostDetail(postId){
    const modalDeleteMsg = "게시글을 삭제하시겠습니까?";
    const article = document.createElement("article");
    article.className = "post-detail";
    handlePostDetailView(postId).then(postDetailData => {
        console.log(postDetailData);
        article.innerHTML = `
            <h2>${postDetailData.title}</h2>
            <div class="post-meta">
                <span>${postDetailData.userNickname}</span> | 
                <span>${postDetailData.createdAt}</span>
            </div>

            <div class="post-actions">
                <button id="btn-post-edit">수정</button>
                <button id="btn-post-delete">삭제</button>
            </div>

            <img src="https://picsum.photos/id/237/200/300" alt="게시글 이미지" class="post-img">

            <p class="content"> ${postDetailData.body}</p>

            <div class="stats">
                <div>좋아요 ${postDetailData.statsLikeCounts}</div>
                <div>조회수 ${postDetailData.statsViewCounts}</div>
                <div>댓글 ${postDetailData.statsCommentCounts}</div>
        </div>
        `;
    
        const btnPostEdit = article.querySelector("#btn-post-edit");
        btnPostEdit.addEventListener("click", () => navigateTo(`/posts/${postId}/edit`));
    
        const btnPostDelete = article.querySelector("#btn-post-delete");
        btnPostDelete.addEventListener("click", () => handleDeleteContents(modalDeleteMsg, postId));
    
    });
    return article;
}