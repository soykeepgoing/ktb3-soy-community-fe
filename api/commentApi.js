import {getState} from "../core/GlobalStore.js"
import { apiFetch } from "./api.js";

export async function getComments(postId) {
    return await apiFetch({
        path: `/api/posts/${postId}/comments`,
        methodType: "GET"
    });
}

export async function createComment({inputData, postId}){
    //console.log(inputData, postId);
    return await apiFetch({
        path: `/api/posts/${postId}/comments`,
        methodType: "POST",
        bodyData: inputData
    });
}

export async function editComment(inputData, postId, commentId){
    return await apiFetch({
        path: `/api/posts/${postId}/comments/${commentId}`,
        methodType: "PATCH", 
        bodyData: inputData
    });
}

export async function deleteComments(postId, commentId){
    return await apiFetch({
        path: `/api/posts/${postId}/comments/${commentId}`,
        methodType: "DELETE"
    })
}