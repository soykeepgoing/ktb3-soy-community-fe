import {h} from "../../core/Renderer.js";

export function PostStats({ like, comment, view }) {
    return h("div", { class: "postStats" }, 
        h("span", {class: "postStatsLike"}, `좋아요 ${like}`),
        h("span", {}, `댓글 ${comment}`),
        h("span", {}, `조회수 ${view}`),
    );
}
