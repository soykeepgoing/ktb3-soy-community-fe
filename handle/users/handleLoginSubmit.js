import { loginUser } from "../../api/userApi.js";
import { setNewDropDown } from "./handleLoginDropDown.js";
import { navigateTo } from "../../router/router.js";

export async function attachLoginSubmit(email, password, helperText){
    const userData = {
        userEmail: email.value,
        userPassword: password.value
    };

    try {
        const response = await loginUser(userData);

        if (!response.ok) {
            helperText.textContent = "아이디 또는 비밀번호를 확인해주세요.";
            helperText.className = "helper-text show";
            return;
        }

        const data = await response.json();
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("userProfileImg", data.data.userProfileImgUrl);
        localStorage.setItem("userEmail", email.value);

        setNewDropDown();
        navigateTo("/posts");

    } catch (err) {
        console.log("로그인 실패:", err);
    }
}
