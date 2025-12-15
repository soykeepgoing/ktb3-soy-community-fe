import { 
    login,
    logout,
    signUp,
    editNickname,
    editProfileImage,
    deleteUser,
    editPassword,
} from "../../api/userApi.js";
// import { navigateTo } from "../../core/router.js";
import {setState, getState, clearStore} from '../../core/GlobalStore.js';
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

        const inputData = {
            email: email.value,
            password: password.value
        };

        const response = await login(inputData);

        if (!response.success) {
            helperText.textContent = "아이디 또는 비밀번호를 확인해주세요.";
            helperText.className = "helper-text invalid";
            return;
        }

        setState("userId", response.data.userId);
        setState("userProfileImg", response.data.userProfileImgUrl);
        setState("userEmail", email.value);
        setState("userNickname", response.data.userNickname);
        setState("isLogin", "true");
        setState("userRole", response.data.role);
        // navigateTo("/posts");
        
    }

    async attachLogoutSubmit(){
        await logout();
    }

    attachSignUpEvents(section){
        const linkLogin = section.querySelector("#signup__login_link_to");
        // linkLogin.onclick = () => navigateTo("/");
    
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
            // navigateTo("/");
        });
    }

    async handleSignUpSubmit(section, userEmail, userPassword, userPasswordCheck, userNickname){
        const formData = new FormData();

        const userData = {
            userEmail: userEmail.value,
            userPassword: userPassword.value,
            userNickname: userNickname.value
        };

        formData.append(
            "data",
            new Blob([JSON.stringify(userData)], { type: "application/json" })
        );

        const profileImgInput = section.querySelector("#userProfileImg");
        if (profileImgInput && profileImgInput.files.length > 0) {
            formData.append("profileImage", profileImgInput.files[0]);
        }

        const response = await signUp(formData);

        if (response.success){
            setState("userId", response.data.userId);
            setState("isLogin", "false");
        }
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
        const userId = getState("userId");

        const formData = new FormData();
        formData.append("userProfileImg", file);

        const imageUrl = await this.convertFileToDataURL(file);
        return imageUrl;
    };

    attachUserEditProfile(section){
        const newUserProfileImgInput = section.querySelector("#userProfileImg");
        const newUserProfileImgInputPreview = section.querySelector("#userProfileImgPreview");
        let newImageUrl = null;
        newUserProfileImgInput.addEventListener(
            "change", async (e) => {
            newImageUrl = await this.handleProfileImageChanged(e);
            newUserProfileImgInputPreview.src = newImageUrl;}
        );
    
        async function handleEditUserProfile(newUserImgInput, newUserNickname, helperText){
            const nickname = newUserNickname.value;
            let isEdited = false;
            if (nickname.length > 0){
                if (!isValidNicknameForSignUp(helperText, nickname)){
                    return false;
                }

                const inputData = {"userNickname": nickname};
                const response = await editNickname(inputData);
                isEdited = response.success;
                setState("userNickname", nickname);
            }

            if (newUserImgInput && newUserImgInput.files.length > 0) {
                const file = newUserImgInput.files[0];
                const inputData = new FormData();
                inputData.append("file", file);
                const response = await editProfileImage(inputData);
                isEdited = response.success;
                setState("userProfileImg", newImageUrl);
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
            () => this.handleUserDelete(titleMsg, contentMsg, getState("userId")));
    
    }
    
    async handleEditPassword({userOldPassword, userNewPassword}){
        const inputData = {
            userOldPassword, 
            userNewPassword
        };

        console.log(inputData);

        await editPassword(inputData);
    }
    


    handleUserDelete(titleMsg, contentMsg, userId){
        Modal(titleMsg, contentMsg);
    
        const modal = document.getElementById("modal-delete");
    
        const btnConfirm = modal.querySelector("#btn-confirm");
        const btnCancel = modal.querySelector("#btn-cancel");
    
        btnCancel.addEventListener("click", 
            () => modal.remove()
        );
    
        btnConfirm.addEventListener("click", async () => {
            await deleteUser(userId);
            modal.remove();
            // navigateTo("/");
            clearStore();
        })
    }

}

export const userEventHandler = new UserEventHandler();
export const attachLoginSubmit = userEventHandler.attachLoginSubmit.bind(userEventHandler);
export const attachSignUpEvents = userEventHandler.attachSignUpEvents.bind(userEventHandler);
export const attachUserEditProfile = userEventHandler.attachUserEditProfile.bind(userEventHandler);
export const handleUserDelete = userEventHandler.handleUserDelete.bind(userEventHandler);
export const attachLogoutSubmit = userEventHandler.attachLogoutSubmit.bind(userEventHandler);
export const handleEditPassword = userEventHandler.handleEditPassword.bind(userEventHandler);