import { fromCreatedAt } from "../../utils/formatUtils.js";
import {h} from "../../core/renderer.js";

export function CommentHeader(data){
    console.log(data.userProfileImgUrl);
    return h(
        "div", 
        {class: "commentHeader"}, 
        h("img", {class: "profileImg", src: data.userProfileImgUrl}),
        h("span", {class: "authorNickname"}, data.userNickname ),
        h("span", {class: "date"},fromCreatedAt(data.createdAt) )
    )
}