import {submitLogin} from "../events/handleSubmitLogin.js"

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
        <p class="link"><a href="./signup.html">회원가입</a></p>
    `;

    const helperText = section.querySelector("#helper-text");

    const userEmail = section.querySelector("#user-email");
    userEmail.addEventListener("input", () => {
        const value = userEmail.value.trim();

        if (value === "") {
            helperText.textContent = "이메일을 입력해주세요.";
            helperText.className = "helper-text show"; 
        } 
        else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) {
            helperText.textContent = "올바른 이메일 형식이 아닙니다.";
            helperText.className = "helper-text error show"; 
        } else{
            helperText.className = "helper-text";
        }
    });

    const userPassword = section.querySelector("#user-password");
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

    userPassword.addEventListener("input", () => {
        const value = userPassword.value.trim();

        if (value === "") {
            helperText.textContent = "비밀번호를 입력해주세요.";
            helperText.className = "helper-text show";
        } 
        else if (!passwordRegex.test(value)) {
            helperText.textContent =
            "비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
            helperText.className = "helper-text show";
        } 
        else {
            helperText.className = "helper-text";
        }
    });

    const loginBtn = section.querySelector("#btn-login");
    loginBtn.addEventListener("click", submitLogin);
    return section;
}