import { 
    loginUser, 
    postSignUpData, 
    uploadNickname,
    uploadProfileImage,
    patchNewPassword,
    deleteUser
} from "../../api/userApi.js";
import { navigateTo } from "../../core/router.js";
import { 
    isValidEmailForSignUp,
    isValidPasswordForSignUp,
    isValidPasswordCheckForSignUp,
    isValidNicknameForSignUp
} from "./UserValidationHandler.js";

import {Modal} from "../../components/Modal/Modal.js";
import { showToast } from "../../components/toast/Toast.js";

class UserEventHandler{
    constructor(){}

    async attachLoginSubmit(email, password, helperText){
        const userData = {
            userEmail: email.value,
            userPassword: password.value
        };

        try {
            const response = await loginUser(userData);

            if (!response.ok) {
                helperText.textContent = "아이디 또는 비밀번호를 확인해주세요.";
                helperText.className = "helper-text invalid";
                return;
            }

            const data = await response.json();
            localStorage.setItem("userId", data.data.userId);
            localStorage.setItem("userProfileImg", data.data.userProfileImgUrl);
            localStorage.setItem("userEmail", email.value);
            localStorage.setItem("userNickname", data.data.userNickname);
            localStorage.setItem("isLogin", "true");
            
            navigateTo("/posts");
            

        } catch (err) {
            console.log("로그인 실패:", err);
        }
    }

    attachSignUpEvents(section){
        const linkLogin = section.querySelector("#signup__login_link_to");
        linkLogin.onclick = () => navigateTo("/");
    
        const userEmail = section.querySelector("#userEmail");
        const userPassword = section.querySelector("#userPassword");
        const userPasswordCheck = section.querySelector("#userPasswordCheck");
        const userNickname = section.querySelector("#userNickname");
    
        const helperTextEmail = section.querySelector("#helper-text-email");
        const helperTextPassword = section.querySelector("#helper-text-pw");
        const helperTextPasswordCheck = section.querySelector("#helper-text-pw-check");
        const helperTextNickname = section.querySelector("#helper-text-nickname");
    
        const signUpBtn = section.querySelector("#signup__btn"); 
        const userProfileImgInput = section.querySelector("#userProfileImg");
        const userProfileImgInputPreview = section.querySelector("#userProfileImgPreview");
    
        // 프로필 이미지 변경
        userProfileImgInput.addEventListener("change", async (e) => {
            const newImageUrl = await this.handleProfileImageChanged(e);
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
        signUpBtn.addEventListener("click", async () => {
            await this.handleSignUpSubmit(section, userEmail, userPassword, userPasswordCheck, userNickname);
            navigateTo("/");
        });
    }

    convertFileToDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
            resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async handleProfileImageChanged(event) {
        const file = event.target.files[0];
        const userId = localStorage.getItem("userId");

        const formData = new FormData();
        formData.append("userProfileImg", file);

        const imageUrl = await convertFileToDataURL(file);
        return imageUrl;
    };


    async handleSignUpSubmit(section, userEmail, userPassword, userPasswordCheck, userNickname){
        const email = userEmail.value;
        const password = userPassword.value;
        const nickname = userNickname.value;
        const userData = {
            userEmail: email,
            userPassword: password,
            userNickname: nickname
        };
        
        await postSignUpData(userData);
    
        const profileImgInput = section.querySelector("#userProfileImg");
    
        if (profileImgInput && profileImgInput.files.length > 0) {
            const file = profileImgInput.files[0];
            await uploadProfileImage(file);
        }
    
        localStorage.setItem("isLogin", "false");
    
    }

    attachUserEditProfile(section){
        const newUserProfileImgInput = section.querySelector("#userProfileImg");
        const newUserProfileImgInputPreview = section.querySelector("#userProfileImgPreview");
    
        newUserProfileImgInput.addEventListener(
            "change", async (e) => {
            const newImageUrl = await this.handleProfileImageChanged(e);
            newUserProfileImgInputPreview.src = newImageUrl;}
        );
    
        async function handleEditUserProfile(newUserImgInput, newUserNickname, helperText){
            const nickname = newUserNickname.value;
    
            if (!isValidNicknameForSignUp(helperText, nickname)){
                return false;
            }
    
            const isEdited = await uploadNickname(nickname);
    
            if (newUserImgInput && newUserImgInput.files.length > 0) {
                const file = newUserImgInput.files[0];
                await uploadProfileImage(file);
            }
            return isEdited;
        }
    
        const newUserNickname = section.querySelector("#user-nickname");
        const helperText = section.querySelector("#helper-text-nickname");
        const btnEditProfile = section.querySelector("#btn-edit");
        btnEditProfile.addEventListener("click", 
            async () => {
                const isEdited = 
                await handleEditUserProfile(newUserProfileImgInput, newUserNickname, helperText);
                if (isEdited){
                    const toastDiv = section.querySelector("#toast");
                    await showToast(toastDiv, "수정 완료");
                }
            }
        );
        
        const linkUserDelete = section.querySelector("#link-user-delete");
        const titleMsg = "회원 탈퇴하시겠습니까?"
        const contentMsg = "작성된 게시글과 댓글은 삭제됩니다."
        linkUserDelete.addEventListener("click", 
            () => this.handleUserDelete(titleMsg, contentMsg, localStorage.getItem("userId")));
    
    }

    handleUserDelete(titleMsg, contentMsg, userId){
        Modal(titleMsg, contentMsg);
    
        const modal = document.getElementById("modal-delete");
    
        const btnConfirm = modal.querySelector("#btn-confirm");
        const btnCancel = modal.querySelector("#btn-cancel");
    
        btnCancel.addEventListener("click", 
            () => modal.remove()
        );
    
        btnConfirm.addEventListener("click", () => {
            deleteUser(userId);
            modal.remove();
            navigateTo("/");
            localStorage.clear();
        })
    }
    
    async handleEditPassword(userOldPassword, userNewPassword){
        const userId = localStorage.getItem("userId");
        await patchNewPassword(userId, userOldPassword, userNewPassword);
    }
    
    async attachEditPassword(section){
    
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
                this.handleEditPassword(userOldPassword, userNewPassword);
                navigateTo("/posts");
            } 
        );
    }

}

export const userEventHandler = new UserEventHandler();
export const attachLoginSubmit = userEventHandler.attachLoginSubmit.bind(userEventHandler);
export const attachSignUpEvents = userEventHandler.attachSignUpEvents.bind(userEventHandler);
export const attachEditPassword = userEventHandler.attachEditPassword.bind(userEventHandler);
export const attachUserEditProfile = userEventHandler.attachUserEditProfile.bind(userEventHandler);
export const handleUserDelete = userEventHandler.handleUserDelete.bind(userEventHandler);