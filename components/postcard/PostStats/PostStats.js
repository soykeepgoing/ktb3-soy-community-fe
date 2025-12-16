import { h } from "../../../core/vdom/h.js";

export function PostStats({like, comment, view}){
    return h("div", 
        {className: "post-stats"}, 
        h("span", {className: "postStatsLike"}, `좋아요 ${like}`),
        h("span", {}, `댓글 ${comment}`),
        h("span", {}, `조회수 ${view}`),
    )
}