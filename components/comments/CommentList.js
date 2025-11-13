import { CommentItem } from "./CommentItem.js";
import { getComments } from "../../api/commentApi.js";

export function CommentList(postId){
    const list = document.createElement("div");
    list.classList.add("comment-list");

    getComments(postId).then(
        commentLists => {
            console.log(commentLists)
            commentLists.forEach(comment => {
                const item = CommentItem(comment, postId);
                list.appendChild(item);
            })
        }
    )


    return list;
}