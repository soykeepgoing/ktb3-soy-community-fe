import { CommentInputForm } from "./CommentInputForm.js";
import {CommentItemList} from "./CommentItemList.js";
import {h} from "../../core/renderer.js";

export function CommentSection(postId){

    return h(
        "div", {class: "commentSection"},
        CommentInputForm(postId),
        CommentItemList(postId)
    )
}