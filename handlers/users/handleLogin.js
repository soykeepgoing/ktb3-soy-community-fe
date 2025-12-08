import { login } from "../../api/userApi.js";
import { setState } from "../../core/GlobalStore.js";

export async function handleLogin({email, password}){

    const inputData = {email, password};
    const response = await login(inputData);

    setState("userId", response.data.userId);
    setState("userProfileImg", response.data.userProfileImgUrl);
    setState("userEmail", email.value);
    setState("userNickname", response.data.userNickname);
    setState("isLogin", "true");
    setState("userRole", response.data.role);

    return response;

}
