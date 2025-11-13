import { handleCommentCreate } from "../../handle/handleCommentCreate.js";

export function CommentInputForm(postId){
    const form = document.createElement('form');
    form.classList.add("comment-input-form");

    form.innerHTML = `
        <textarea class="comment-textarea" placeholder="댓글을 남겨주세요!" required></textarea>
        <button type="submit" class="btn-comment-submit">댓글 등록</button>
    `;

    const inputValue = form.querySelector("textarea").value;
    form.addEventListener('submit', async () => await handleCommentCreate(postId, inputValue));

    return form;
}