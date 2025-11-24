import {h} from "../../core/renderer.js"
import {handleCommentCreate} from "../../handle/comments/CommentEventHandler.js";

export function CommentInputForm(postId){
    return h(
        "div", 
        {class: "commentInputForm"}, 
        h(
            "textarea", {class: "textarea", id: "commentContent",  placeholder: "댓글을 남겨주세요."}
        ), 
        h(
            "button", {class: "btn", onClick: async() => {await handleCommentCreate(postId)}}, "댓글 등록" 
        )
    );
}