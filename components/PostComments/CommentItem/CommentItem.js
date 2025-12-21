import { h } from "../../../core/vdom/h.js";
import { getState } from "../../../core/GlobalStore.js";
import { formatTime } from "../../../utils/formatUtils.js";

export function CommentItem({
    comment, 
    onEdit, 
    onDelete
}){
    const canEdit = comment.userId === getState("userId");
    console.log(comment.userId, getState("useId"));

    return h(
        "div", 
        {className: "comment-item"}, 
        h("div", { className: "comment-header"},
            h("img", {className: "comment-avatar", src: comment.userProfileImgUrl}),
            h("span", {className: "comment-author"}, comment.userNickname),
            h("span", {className: "comment-date"}, formatTime(comment.createdAt))
        ), 
        h("p", { className: "comment-body"}, comment.body), 
        canEdit 
        ? h("div", {className: "comment-actions"},
            h("button", { type: "button", onClick: () => onEdit(comment)}, "수정"), 
            h("button", { type: "button", onClick: () => onDelete(comment.id)}, "삭제")
        )
        : null
    )
}