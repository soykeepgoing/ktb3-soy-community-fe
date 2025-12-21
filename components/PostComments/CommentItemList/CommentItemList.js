import { h } from "../../../core/vdom/h.js";
import { CommentItem } from "../CommentItem/CommentItem.js";

export function CommentItemList({ comments, onEdit, onDelete }) {
    return h(
        "div",
        { className: "comment-list" },
        ...(comments ?? []).map((comment) =>
            CommentItem({ comment, onEdit, onDelete })
        )
    );
}
