import { h } from "../../../core/vdom/h.js";
import {PostItemTopic} from "../PostItemTopic/PostItemTopic.js";
import { PostItemPreview} from "../PostItemPreview/PostItemPreview.js";

export function PostItemContent({topicCode, topicLabel, content}){
    return h("div", {className: "postItem-content"}, 
        PostItemTopic({topicCode, topicLabel}),
        PostItemPreview({content})
    )
}