import { isValidNicknameForSignUp } from "../handle/users/handleSignUpValid.js";
import {uploadNickname, uploadProfileImage} from "../api/userApi.js";

export async function handleEditUserProfile(newUserImgInput, newUserNickname, helperText){
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