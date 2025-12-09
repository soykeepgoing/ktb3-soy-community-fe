import { h } from "../../core/vdom/h.js";

export function TopicBadge({code, label}){
    return h(
        "span", 
        {className: ["badge", code]}, 
        label
    );
}