import { createPost} from "../api/postApi.js"
import { navigateTo } from "../router/router.js";

export async function handlePostCreate(event){
    event.preventDefault();

    const postTitle = document.querySelector("#post-title").value.trim();
    const postBody = document.querySelector("#post-body").value.trim();
    const userId = localStorage.getItem("userId");

    const newPost = {
        "postTitle": postTitle, 
        "postContent": postBody
    };

    const isCreated = await createPost(newPost, userId);
    if (isCreated){
        console.log("게시글 작성 완료");
        navigateTo("/posts");
    } 
}