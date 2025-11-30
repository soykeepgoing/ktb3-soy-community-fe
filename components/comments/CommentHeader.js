import { formatTime } from "../../utils/formatUtils.js";
import {h} from "../../core/Renderer.js";

export function CommentHeader(data){
    return h(
        "div", 
        {class: "commentHeader"}, 
        h("img", {class: "profileImg", src: data.userProfileImgUrl}),
        h("span", {class: "authorNickname"}, data.userNickname ),
        h("span", {class: "date"},formatTime(data.createdAt) )
    )
}