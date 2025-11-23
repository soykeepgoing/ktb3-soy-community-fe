import {h} from "../../core/renderer.js";

export function PostStats({ like, comment, view }) {
    return h("div", { class: "postStats" },
        `좋아요 ${like} · 댓글 ${comment} · 조회수 ${view}`
    );
}
