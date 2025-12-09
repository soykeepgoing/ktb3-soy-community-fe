import { h } from "../../../core/vdom/h.js";
import { PostItemAvatar } from "../PostItemAvatar/PostItemAvatar.js";
import { PostItemNickname } from "../PostItemNickname/PostItemNickname.js";

export function PostItemAuthorInfo({nickname, profileImg}){
    return h("div", {className: "postItem-author"}, 
        PostItemAvatar(profileImg), 
        PostItemNickname(nickname)
    )
}