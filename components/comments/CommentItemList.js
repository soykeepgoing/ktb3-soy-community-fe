import {h} from "../../core/Renderer.js"
import {loadCommentList} from "../../handle/comments/CommentEventHandler.js"

export function CommentItemList(postId){
    return h("div", 
        {class: "commentList", id: "commentList"}
    );
}