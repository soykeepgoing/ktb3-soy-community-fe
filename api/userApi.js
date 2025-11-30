import {getState, setState} from "../core/GlobalStore.js"
import { apiFetch } from "./api.js";

export async function login(inputData) {
    return await apiFetch({
        path: "/api/auth/login",
        methodType: "POST", 
        bodyData: inputData
    });
}

export async function logout(){
    return await apiFetch({
        path: "/api/auth/logout",
        methodType: "POST"
    });
}

export async function signUp(inputData){
    return await apiFetch({
            path: "/api/users",
            methodType: "POST",
            bodyData: inputData
        });
}

export async function editNickname(inputData){    
    return await apiFetch({
        path: "/api/users/me/profile",
        methodType: "PATCH",
        bodyData: inputData
    })
}


export async function editProfileImage(inputData){
    return await apiFetch({
        path: "/api/users/me/profile-image",
        methodType: "POST",
        bodyData: inputData
    });
}

export async function editPassword(inputData){
    return await apiFetch({
        path: "/api/users/me/password",
        methodType: "PATCH", 
        bodyData: inputData
    });
}

export async function deleteUser(){
    return await apiFetch({
        path: "/api/users",
        methodType: "DELETE"
    });
}