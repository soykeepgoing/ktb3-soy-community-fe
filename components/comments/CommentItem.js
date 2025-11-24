import {h} from "../../core/renderer.js";
import { handleDeleteComments } from "../../handle/comments/handleCommentDelete.js";

import {CommentHeader} from "./CommentHeader.js";

export function CommentItem(data) {
    return h(
        "div", 
        {class: "commentItem"}, 
        CommentHeader(data),
        h("p", {class: "body"}, data.body),
        h("div", {class: "btns"},
            h("button", {class: "btnEdit"}, "수정"), 
            h("button", {class: "btnDelete", onClick: handleDeleteComments}, "삭제")
        )
    );
}
