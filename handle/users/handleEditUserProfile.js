import { isValidNicknameForSignUp } from "../../handle/users/handleSignUpValid.js";
import {uploadNickname, uploadProfileImage} from "../../api/userApi.js";
import {handleProfileImageChanged} from "../../handle/users/handleProfileImageChanged.js"
import { handleUserDelete } from "../../handle/users/handleUserDelete.js";
import { showToast } from "../../components/users/Toast.js";

export function attachUserEditProfile(section){
    const newUserProfileImgInput = section.querySelector("#userProfileImg");
    const newUserProfileImgInputPreview = section.querySelector("#userProfileImgPreview");

    newUserProfileImgInput.addEventListener(
        "change", async (e) => {
        const newImageUrl = await handleProfileImageChanged(e);
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
                showToast(toastDiv, "수정 완료");
            }
        }
    );
    
    const linkUserDelete = section.querySelector("#link-user-delete");
    const titleMsg = "회원 탈퇴하시겠습니까?"
    const contentMsg = "작성된 게시글과 댓글은 삭제됩니다."
    linkUserDelete.addEventListener("click", 
        () => handleUserDelete(titleMsg, contentMsg, localStorage.getItem("userId")));

}