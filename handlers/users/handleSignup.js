import { signUp } from "../../api/userApi.js";
import { setState } from "../../core/GlobalStore.js";

export async function handleSignUp({email, password, nickname, profileImage}){
    const formData = new FormData();

    const userData = {
        userEmail: email, 
        userPassword: password,
        userNickname: nickname
    };

    formData.append(
        "data",
        new Blob([JSON.stringify(userData)], { type: "application/json" })
    );

    if(profileImage){
        formData.append("profileImage", profileImage);
    }

    const response = await signUp(formData);

    if (response.success){
        setState("userId", response.data.userId);
        setState("isLogin", "false");
    }

    return response; 
}