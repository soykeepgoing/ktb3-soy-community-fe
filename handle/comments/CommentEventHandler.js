import { getComments, createComment } from "../../api/commentApi.js";
import { CommentItem } from "../../components/Comments/CommentItem.js";
import {createDom} from "../../core/renderer.js";

class CommentEventHandler{
    constructor(){}

    loadCommentList(postId, ){
        const commentItemList = document.querySelector("#commentList");
        getComments(postId).then(commentList => {
            commentList.forEach(comment => {
                const commentItem = createDom(CommentItem(comment));
                commentItemList.appendChild(commentItem);
        });
        });
    }

    async handleCommentCreate(postId){
        const commentTextArea = document.querySelector("#commentContent");
        const commentItemList = document.querySelector("#commentList");
        console.log(commentItemList);
        const commentContent = commentTextArea.value; 

        const commentData = {"commentContent": commentContent};
        const res = await createComment(commentData, postId);
        if (res.state){
            const newCommentItem = CommentItem(res, postId);
            const newCommentItemDom = createDom(newCommentItem);
            commentItemList.appendChild(newCommentItemDom);
            document.querySelector("#commentContent").value = "";
        }
        return res;
    }

}

const commentEventHandler = new CommentEventHandler();
export const loadCommentList = commentEventHandler.loadCommentList.bind(commentEventHandler);
export const handleCommentCreate = commentEventHandler.handleCommentCreate.bind(commentEventHandler);