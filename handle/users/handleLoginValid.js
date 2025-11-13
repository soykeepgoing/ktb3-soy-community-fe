import { handleInvalidEmail, handleInvalidPassword } from "./handleValidation.js";
import {attachLoginSubmit} from "./handleLoginSubmit.js";

export function attachLoginValid(section){
    let activeField = null; // 현재 포커스된 입력 필드 추적용

    const helperText = section.querySelector("#helper-text");
    const userEmail = section.querySelector("#user-email");
    const userPassword = section.querySelector("#user-password");
    const loginBtn = section.querySelector("#btn-login");

    userEmail.addEventListener("focus", () => (activeField = "email"));
    userPassword.addEventListener("focus", () => (activeField = "password"));

    function validateAll() {
    
        let emailValid = handleInvalidEmail(helperText, userEmail.value);
        let passwordValid = handleInvalidPassword(helperText, userPassword.value);

        // 현재 focus된 input에 따라 메시지 결정
        if (activeField === "email") {
        emailValid = handleInvalidEmail(helperText, userEmail.value);
        } else if (activeField === "password") {
        passwordValid = handleInvalidPassword(helperText, userPassword.value);
        }

        // 버튼 활성화
        loginBtn.disabled = !(emailValid && passwordValid);
    }

    userEmail.addEventListener("input", validateAll);
    userPassword.addEventListener("input", validateAll);

    loginBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        await attachLoginSubmit(userEmail, userPassword, helperText);
    });
}
