import { likePost, dislikePost } from "../../api/postApi.js";
export async function handleLikePost({ isUserLiked, postId}){
    let res; 
    if (isUserLiked){
        res = await dislikePost(postId);
    } else {
        res = await likePost(postId);
    }
    return res
}