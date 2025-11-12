import {submitLogin} from "../handle/handleSubmitLogin.js"
import {handleInvalidEmail} from "../handle/handleLoginInvalidInput.js";

export function Login(){
    const section = document.createElement("section");
    section.className = "login-box";
    section.innerHTML = `
        <h2 class = "login-box-title">로그인</h2>
        <form>
            <label>이메일</label>
            <input type="email" id = "user-email" placeholder="이메일을 입력하세요">
            <label>비밀번호</label>
            <input type="password" id = "user-password" placeholder="비밀번호를 입력하세요">
            <p class="helper-text" id="helper-text">* helper text</p>
            <button class="btn-primary" id = "btn-login">로그인</button>
        </form>
    `;

    const helperText = section.querySelector("#helper-text");
    const userEmail = section.querySelector("#user-email");
    userEmail.addEventListener("input", () => handleInvalidEmail(helperText, userEmail.value));

    const userPassword = section.querySelector("#user-password");
    userPassword.addEventListener("input", () => handleInvalidPassword(helperText, userPassword));
    
    const loginBtn = section.querySelector("#btn-login");
    loginBtn.addEventListener("click", submitLogin);

    return section;
}