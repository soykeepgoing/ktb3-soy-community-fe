import { handleSignUpSubmit } from "./handleSignUpSubmit.js";
import { handleProfileImageChanged } from "./handleProfileImageChanged.js";
import { 
    isValidEmailForSignUp,
    isValidPasswordForSignUp,
    isValidPasswordCheckForSignUp,
    isValidNicknameForSignUp
} from "./handleSignUpValid.js";
import { navigateTo } from "../../router/router.js";

export function attachSignUpEvents(section){
    const linkLogin = section.querySelector("#link-login");
    linkLogin.onclick = () => navigateTo("/");

    const userEmail = section.querySelector("#userEmail");
    const userPassword = section.querySelector("#userPassword");
    const userPasswordCheck = section.querySelector("#userPasswordCheck");
    const userNickname = section.querySelector("#userNickname");

    const helperTextEmail = section.querySelector("#helper-text-email");
    const helperTextPassword = section.querySelector("#helper-text-pw");
    const helperTextPasswordCheck = section.querySelector("#helper-text-pw-check");
    const helperTextNickname = section.querySelector("#helper-text-nickname");

    const signUpBtn = section.querySelector("#btn-signup"); 
    const userProfileImgInput = section.querySelector("#userProfileImg");
    const userProfileImgInputPreview = section.querySelector("#userProfileImgPreview");

    // 프로필 이미지 변경
    userProfileImgInput.addEventListener("change", async (e) => {
        const newImageUrl = await handleProfileImageChanged(e);
        userProfileImgInputPreview.src = newImageUrl;
    });

    // validation 상태
    let isEmailValid = false;
    let isPasswordValid = false;
    let isPasswordCheckValid = false;
    let isNicknameValid = false;

    function updateButtonState(){
        signUpBtn.disabled = !(isEmailValid && isPasswordValid && isPasswordCheckValid && isNicknameValid);
    }

    // blur validations
    userEmail.addEventListener("blur", () => {
        isEmailValid = isValidEmailForSignUp(helperTextEmail, userEmail.value);
        updateButtonState();
    });

    userPassword.addEventListener("blur", () => {
        isPasswordValid = isValidPasswordForSignUp(helperTextPassword, userPassword.value);
        updateButtonState();
    });

    userPasswordCheck.addEventListener("blur", () => {
        isPasswordCheckValid = isValidPasswordCheckForSignUp(
            helperTextPasswordCheck,
            userPasswordCheck.value,
            userPassword.value
        );
        updateButtonState();
    });

    userNickname.addEventListener("blur", () => {
        isNicknameValid = isValidNicknameForSignUp(helperTextNickname, userNickname.value);
        updateButtonState();
    });

    // submit
    signUpBtn.addEventListener("click", () => {
        handleSignUpSubmit(userEmail, userPassword, userPasswordCheck, userNickname);
        navigateTo("/");
    });
}
