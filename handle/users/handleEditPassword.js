import { patchNewPassword } from "../../api/userApi.js";
import {isValidPasswordForSignUp, isValidPasswordCheckForSignUp} from "../../handle/users/handleSignUpValid.js";
import { navigateTo } from "../../router/router.js";

async function handleEditPassword(userOldPassword, userNewPassword){
    const userId = localStorage.getItem("userId");
    await patchNewPassword(userId, userOldPassword, userNewPassword);
}

export async function attachEditPassword(section){

    const userOldPassword = section.querySelector("#userOldPassword");
    const userNewPassword = section.querySelector("#userNewPassword");
    const userPasswordCheck = section.querySelector("#userPasswordCheck");

    const helperTextOldPassword = section.querySelector("#helper-text-old-pw");
    const helperTextNewPassword = section.querySelector("#helper-text-new-pw");
    const helperTextPasswordCheck = section.querySelector("#helper-text-pw-check");
  
    const editBtn = section.querySelector("#btn-edit"); 
    let isOldPasswordValid = false;
    let isNewPasswordValid = false;
    let isPasswordCheckValid = false;

    /*ai 코드*/
    function updateButtonState(){
        editBtn.disabled = !(isOldPasswordValid && isNewPasswordValid && isPasswordCheckValid)
    }

    userOldPassword.addEventListener("blur", () => {
        isOldPasswordValid = isValidPasswordForSignUp(
            helperTextOldPassword, userOldPassword.value
        );
        updateButtonState();
    })

    userNewPassword.addEventListener("blur", () => {
        isNewPasswordValid = isValidPasswordForSignUp(
            helperTextNewPassword, userNewPassword.value
        );
        updateButtonState();
    })

    userPasswordCheck.addEventListener("input", () => {
        isPasswordCheckValid = isValidPasswordCheckForSignUp(
            helperTextPasswordCheck, userPasswordCheck.value, userNewPassword.value
        );
        updateButtonState();
    })
    

    editBtn.addEventListener(
        "click", 
        () => {
            handleEditPassword(userOldPassword, userNewPassword);
            navigateTo("/posts");
        } 
    );
}