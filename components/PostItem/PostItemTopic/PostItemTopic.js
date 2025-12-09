import { TopicBadge } from "../../TopicBadge/TopicBadge.js";

export function PostItemTopic({topicCode, topicLabel}){
    return TopicBadge({
        code: topicCode, 
        label: topicLabel
    });
}