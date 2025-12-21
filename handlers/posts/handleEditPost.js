import { editPost } from "../../api/postApi.js";

export async function handleEditPost({ postContent, postImageFile, postId}){
    const newPostData = new FormData();

    newPostData.append(
        "data",
        new Blob([JSON.stringify({
            "postContent": postContent
        })], { type: "application/json" })
    );

    if (postImageFile){
        newPostData.append("postImgFile", postImageFile);
    }

    return await editPost(postId, newPostData);
}