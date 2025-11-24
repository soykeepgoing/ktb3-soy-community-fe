import {attachLoginSubmit} from "./UserEventHandler.js";

class UserValidationHandler{

    activeField = null; // 현재 포커스된 입력 필드 추적용
    passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

    constructor(){}

    handleInvalidEmail(helperText, value){
        if (value === "") {
            helperText.textContent = "이메일을 입력해주세요.";
            helperText.className = "helper-text invalid";
            return false;
        } 
        else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) {
            helperText.textContent = "올바른 이메일 형식이 아닙니다.";
            helperText.className = "helper-text invalid";
            return false;
        } else{
            helperText.textContent = "";
            helperText.className = "helper-text valid";
            return true;
        }
    }

    handleInvalidPassword(helperText, value){
        if (value === "") {
            helperText.textContent = "비밀번호를 입력해주세요.";
            helperText.className = "helper-text invalid";
            return false;
        } 
        else if (!this.passwordRegex.test(value)) {
            helperText.textContent =
            "비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
            helperText.className = "helper-text invalid";
            return false;
        } 
        else {
            helperText.textContent = "";
            helperText.className = "helper-text valid";
            return true;
        }
    }

    
    isValidEmailForSignUp(helperText, email){
        if (email === ""){
            helperText.textContent = "*이메일을 입력해주세요.";
            helperText.className = "helper-text invalid";
            return false;
        }
        else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
            helperText.textContent = "*올바른 이메일 형식이 아닙니다.";
            helperText.className = "helper-text invalid";
            return false;
        } else{
            helperText.textContent = "";
            helperText.classList.remove("invalid");
            return true;
        }
    }

    isValidPasswordForSignUp(helperText, password){
        if (password === ""){
            helperText.textContent = "*비밀번호를 입력해주세요.";
            helperText.className = "helper-text invalid";
            return false;
        }
        else if (!this.passwordRegex.test(password)) {
            helperText.textContent = "*비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
            helperText.className = "helper-text invalid";
            return false;
        } else{
            helperText.textContent = "";
            helperText.classList.remove("invalid");
            return true;
        }
    }

    isNotValidPassword(userPassword, userPasswordCheck){
        return userPassword != userPasswordCheck;
    }

    isValidPasswordCheckForSignUp(helperText, passwordCheck, password){
        if (passwordCheck === ""){
            helperText.textContent = "*비밀번호를 한번 더 입력해주세요.";
            helperText.className = "helper-text invalid";
            return false;
        } else if (this.isNotValidPassword(password, passwordCheck)){
            helperText.textContent = "*비밀번호가 다릅니다.";
            helperText.className = "helper-text invalid";
            return false;  
        } else {
            helperText.textContent = "";
            helperText.classList.remove("invalid");
            return true;
        }
    }

    isValidNicknameForSignUp(helperText, nickname){
        if (nickname === ""){
            helperText.textContent = "*닉네임을 한번 더 입력해주세요.";
            helperText.className = "helper-text invalid";
            return false;
        } else if (nickname.includes(" ")){
            helperText.textContent = "*공백이 포함되어 있습니다.";
            helperText.className = "helper-text invalid";
            return false;
        } else if (nickname.length >= 11){
            helperText.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
            helperText.className = "helper-text invalid";
            return false;
        } else{
            helperText.textContent = "";
            helperText.classList.remove("invalid");
            return true;
        }
    }


    validateAll({btn, helperText, email, password}) {

        let emailValid = this.handleInvalidEmail(helperText, email);
        let passwordValid = this.handleInvalidPassword(helperText, password);

        // 현재 focus된 input에 따라 메시지 결정
        if (this.activeField === "email") {
            emailValid = this.handleInvalidEmail(helperText, email);
        } else if (this.activeField === "password") {
            passwordValid = this.handleInvalidPassword(helperText, password);
        }

        // 버튼 활성화
        btn.disabled = !(emailValid && passwordValid);
    }

    attachLoginValid(section){
        
    
        const helperText = section.querySelector("#login__helper-text");
        const userEmail = section.querySelector("#login__user-email-input");
        const userPassword = section.querySelector("#login__user-password-input");
        const loginBtn = section.querySelector("#login__btn");
    
        userEmail.addEventListener("focus", () => (this.activeField = "email"));
        userPassword.addEventListener("focus", () => (this.activeField = "password"));

        userEmail.addEventListener("input", () => this.validateAll({
                                                                    btn: loginBtn, 
                                                                    helperText: helperText, 
                                                                    email: userEmail.value, 
                                                                    password: userPassword.value
                                                                    }));
        userPassword.addEventListener("input", () => this.validateAll({
                                                                    btn: loginBtn, 
                                                                    helperText: helperText, 
                                                                    email: userEmail.value, 
                                                                    password: userPassword.value
                                                                    }));
        loginBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            await attachLoginSubmit(userEmail, userPassword, helperText);
        });
    }
    

}

export const userValidationHandler = new UserValidationHandler();
export const attachLoginValid = userValidationHandler.attachLoginValid.bind(userValidationHandler);
export const isValidEmailForSignUp = userValidationHandler.isValidEmailForSignUp.bind(userValidationHandler);
export const isValidPasswordForSignUp = userValidationHandler.isValidPasswordForSignUp.bind(userValidationHandler);
export const isValidPasswordCheckForSignUp = userValidationHandler.isValidPasswordCheckForSignUp.bind(userValidationHandler);
export const isValidNicknameForSignUp = userValidationHandler.isValidNicknameForSignUp.bind(userValidationHandler);
