import { createComment } from "../api/commentApi.js";

export async function handleCommentCreate(postId, inputValue){
    event.preventDefault();

    const commentData = {
        "commentContent": inputValue
    };

    const res = await createComment(commentData, postId);

    if (res.state == "success"){
        console.log('댓글 등록 완료');
    }
}