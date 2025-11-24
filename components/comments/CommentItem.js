import {h} from "../../core/Renderer.js";
import { getState } from "../../core/GlobalStore.js";

import { handleCommentDelete, handleCommentEdit } from "../../handle/comments/CommentEventHandler.js";
import {CommentHeader} from "./CommentHeader.js";

export function CommentItem(postId, data) {
    const isEditable = data.userNickname === getState("userNickname");

    const children = [
        CommentHeader(data),
        h("p", {class: "body"}, data.body)
    ];

    if (isEditable){
        children.push(
            h("div", {class: "btns"},
                h("button", {class: "btnEdit", onClick: async() => {
                    await handleCommentEdit(data.id);}}, "수정"), 
                h("button", {class: "btnDelete", onClick: async () => await handleCommentDelete(postId, data.id)}, "삭제"))
        );
    }

    return h(
        "div", 
        {class: "commentItem", "data-comment-id": data.id}, 
        ...children
    );
}
