import { createPost} from "../api/postApi.js"
import { navigateTo } from "../router/router.js";
import {uploadImageFile} from "../api/postApi.js";

export async function handlePostCreate(event){
    event.preventDefault();

    const postTitle = document.querySelector("#post-title").value.trim();
    const postBody = document.querySelector("#post-body").value.trim();
    const postImgFile = document.querySelector("#post-image");
    const userId = localStorage.getItem("userId");

    const newPost = {
        "postTitle": postTitle, 
        "postContent": postBody
    };

    const {state, postId} = await createPost(newPost, userId);
    if (state){
        console.log("게시글 작성 완료");
        navigateTo("/posts");
    } 

    if (postImgFile.files.length > 0){
        const file = postImgFile.files[0];
        uploadImageFile(postId, file);
    }


}