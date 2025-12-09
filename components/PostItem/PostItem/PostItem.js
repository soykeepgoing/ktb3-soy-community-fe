import { h } from "../../../core/vdom/h.js";
import { PostItemThumbnail } from "../PostItemThumbnail/PostItemThumbnail.js";
import { PostItemContent } from "../PostItemContent/PostItemContent.js";
import { PostItemAuthorInfo } from "../PostItemAuthorInfo/PostItemAuthorInfo.js";

export function PostItem(props){
    return h("div", {className: "postItem"}, 
        PostItemThumbnail(props.postImgUrl),
        h("div", {className: "info"}, 
            PostItemContent({
                topicCode: props.topicCode, 
                topicLabel: props.topicLabel, 
                content: props.content
            }), 
            PostItemAuthorInfo({
                nickname: props.userNickname, 
                profileImg: props.userProfileImgUrl
            })
        )

    );
}