import { editPost } from "../api/postApi.js";

export async function handlePostEdit(event, postId){
    event.preventDefault();

    const postTitle = document.querySelector("#post-title").value.trim();
    const postBody = document.querySelector("#post-body").value.trim();

    const newPost = {
        "postTitle": postTitle, 
        "postContent": postBody
    };

    const userId = localStorage.getItem("userId");
    const isCreated = await editPost(newPost, postId, userId);
    if (isCreated){
        console.log("게시글 수정 완료");
    } 
}