
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

export function isValidEmailForSignUp(helperText, email){
    if (email === ""){
        helperText.textContent = "*이메일을 입력해주세요.";
        helperText.className = "helper-text show";
        return false;
    }
    else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
        helperText.textContent = "*올바른 이메일 형식이 아닙니다.";
        helperText.className = "helper-text show";
        return false;
    } else{
        helperText.className = "helper-text hide";
        return true;
    }
}

export function isValidPasswordForSignUp(helperText, password){
    if (password === ""){
        helperText.textContent = "*비밀번호를 입력해주세요.";
        helperText.className = "helper-text show";
        return false;
    }
    else if (!passwordRegex.test(password)) {
        helperText.textContent = "*비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
        helperText.className = "helper-text show";
        return false;
    } else{
        helperText.className = "helper-text hide";
        return true;
    }
}

function isNotValidPassword(userPassword, userPasswordCheck){
    return userPassword != userPasswordCheck;
}

export function isValidPasswordCheckForSignUp(helperText, passwordCheck, password){
    if (passwordCheck === ""){
        helperText.textContent = "*비밀번호를 한번 더 입력해주세요.";
        helperText.className = "helper-text show";
        return false;
    } else{

        if (password.length > 0){
            if (isNotValidPassword(password, passwordCheck)){
                helperText.textContent = "*비밀번호가 다릅니다.";
                helperText.className = "helper-text show";
                return false;  
            }
        }

        helperText.className = "helper-text hide";
        return true;
    }
}

export function isValidNicknameForSignUp(helperText, nickname){
    if (nickname === ""){
        helperText.textContent = "*닉네임을 한번 더 입력해주세요.";
        helperText.className = "helper-text show";
        return false;
    } else if (nickname.includes(" ")){
        helperText.textContent = "*공백이 포함되어 있습니다.";
        helperText.className = "helper-text show";
        return false;
    } else if (nickname.length >= 11){
        helperText.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
        helperText.className = "helper-text show";
        return false;
    } else{
        helperText.className = "helper-text hide";
        return true;
    }
}