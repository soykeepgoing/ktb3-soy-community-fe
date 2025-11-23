import {h} from "../../core/renderer.js"

export function CommentInputForm(){
    return h(
        "div", 
        {class: "commentInputForm"}, 
        h(
            "textarea", {class: "textarea", placeholder: "댓글을 남겨주세요."}
        ), 
        h(
            "button", {class: "btn"}, "댓글 등록" 
        )
    );
}