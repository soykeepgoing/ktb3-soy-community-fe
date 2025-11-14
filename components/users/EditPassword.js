import { handleEditPassword } from "../../handle/users/handleEditPassword.js";
import {isValidPasswordForSignUp, isValidPasswordCheckForSignUp} from "../../handle/users/handleSignUpValid.js";
import { navigateTo } from "../../router/router.js";

export function EditPassword(){
    const section = document.createElement("section");
    section.className = "edit-profile-box";
    section.innerHTML = `
    <h2>비밀번호 수정</h2>
    <form>
        <div class="profile-details">
          <label>기존 비밀번호*</label>
          <input type="password" id="userOldPassword" placeholder="기존 비밀번호를 입력하세요">
          <p class="helper-text" id="helper-text-old-pw">* helper text</p>

          <label>비밀번호*</label>
          <input type="password" id="userNewPassword" placeholder="새 비밀번호를 입력하세요">
          <p class="helper-text" id="helper-text-new-pw">* helper text</p>

          <label>비밀번호 확인*</label>
          <input type="password" id="userPasswordCheck" placeholder="새 비밀번호를 한 번 더 입력하세요">
          <p class="helper-text" id="helper-text-pw-check">* helper text</p>
        </div>
    </form>

    <button class="btn-primary" id="btn-edit" disabled>수정하기</button>
  `;
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

    return section;
}