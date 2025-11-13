import { isValidNicknameForSignUp } from "./handleSignUpValidation.js";
import {uploadNickname, uploadProfileImage} from "../api/userApi.js";

export async function handleEditUserProfile(newUserImgInput, newUserNickname, helperText){
    const nickname = newUserNickname.value;

    if (!isValidNicknameForSignUp(helperText, nickname)){
        return;
    }

    await uploadNickname(nickname)

    if (newUserImgInput && newUserImgInput.files.length > 0) {
      const file = newUserImgInput.files[0];
      await uploadProfileImage(file);
    }
    
}