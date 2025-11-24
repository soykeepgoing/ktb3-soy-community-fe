import {h} from "../../core/Renderer.js"
import {handleCommentCreate} from "../../handle/comments/CommentEventHandler.js";

export function CommentInputForm(postId){
    return h(
        "div", 
        {class: "commentInputForm"}, 
        h(
            "textarea", {class: "textarea", id: "commentContent", placeholder: "댓글을 남겨주세요."}
        ), 
        h(
            "button", {class: "btn", id: "commentCreateBtn"}, "댓글 등록" 
        )
    );
}