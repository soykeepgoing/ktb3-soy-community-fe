import { setState } from "../core/GlobalStore.js";
import { apiFetch } from "./api.js";

export async function getPosts(currentPage, pageSize){
    return await apiFetch({
        path: `/api/posts?page=${currentPage}&size=${pageSize}`,
        methodType: "GET"
    })
}

export async function getPostDetail(postId){
    return await apiFetch({
        path: `/api/posts/${postId}`,
        methodType: "GET"
    });
}

export async function createPost(inputData){
    return await apiFetch({
        path: "/api/posts",
        methodType: "POST", 
        bodyData: inputData
    });
}

export async function editPost(newPostData, postId){
    return await apiFetch({
        path: `/api/posts/${postId}`,
        methodType: "PATCH",
        bodyData: newPostData
    });
}

export async function uploadImageToPost(inputData, postId){
    return await apiFetch({
        path: `/api/posts/${postId}/image`,
        methodType: "POST", 
        bodyData: inputData
    })
}

export async function likePost(postId){
    return await apiFetch({
        path: `/api/posts/${postId}/likes`,
        methodType: "POST"
    });
}

export async function dislikePost(postId){
    return await apiFetch({
        path: `/api/posts/${postId}/likes`,
        methodType: "DELETE"
    });
}

export async function deletePost(postId){
    return await apiFetch({
        path: `/api/posts/${postId}`,
        methodType: "DELETE"
    })
}

