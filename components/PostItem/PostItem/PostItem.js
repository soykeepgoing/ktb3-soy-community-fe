import { h } from "../../../core/vdom/h.js";
import { PostItemThumbnail } from "../PostItemThumbnail/PostItemThumbnail.js";
import { PostItemContent } from "../PostItemContent/PostItemContent.js";
import { PostItemAuthorInfo } from "../PostItemAuthorInfo/PostItemAuthorInfo.js";
import { router } from "../../../core/router.js";

export function PostItem(props){
    const postId = props.id ?? props.postId;

    return h("div", {className: "postItem", onClick: () => {router.navigate(`/posts/${postId}`)}}, 
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
