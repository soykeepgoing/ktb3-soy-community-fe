import {h} from "../../core/renderer.js";
import { handleCommentDelete } from "../../handle/comments/CommentEventHandler.js";
import {CommentHeader} from "./CommentHeader.js";

export function CommentItem(postId, data) {
    return h(
        "div", 
        {class: "commentItem"}, 
        CommentHeader(data),
        h("p", {class: "body"}, data.body),
        h("div", {class: "btns"},
            h("button", {class: "btnEdit"}, "수정"), 
            h("button", {class: "btnDelete", onClick: async () => await handleCommentDelete(postId, data.id)}, "삭제")
        )
    );
}
