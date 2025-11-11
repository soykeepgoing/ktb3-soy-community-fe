import { getPostDetail } from "../api/postApi.js";

export async function handlePostDetailView(postId){
    return await getPostDetail(postId);
}