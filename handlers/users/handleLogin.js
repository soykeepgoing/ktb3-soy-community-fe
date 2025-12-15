import { login } from "../../api/userApi.js";
import { setState } from "../../core/GlobalStore.js";

export async function handleLogin({email, password}){

    const inputData = {email, password};
    const response = await login(inputData);

    if (response?.success) {
        setState("userId", response.data.userId);
        setState("userProfileImg", response.data.userProfileImgUrl);
        setState("userEmail", email);
        setState("userNickname", response.data.userNickname);
        setState("userRole", response.data.role);
        setState("isLogin", "true");
    }

    return response;

}
