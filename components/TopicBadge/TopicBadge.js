import {h} from "../../core/Renderer.js";

export function TopicBadge(label, code){
    return h(
        "span", 
        {class: ["badge", code]}, 
        label
    );
}