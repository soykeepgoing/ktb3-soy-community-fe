import { isNotValidPassword} from "../utils/validationUtils.js";
import { postSignUpData, uploadProfileImage } from "../api/userApi.js";

export function handleSignUpData(userEmail, userPassword, userPasswordCheck, userNickname){
    const email = userEmail.value;
    const password = userPassword.value;
    const passwordCheck = userPasswordCheck.value;
    const nickname = userNickname.value;

    if (isNotValidPassword(password, passwordCheck)){
        return;
    }

    const userData = {
        userEmail: email,
        userPassword: password,
        userNickname: nickname
    };
    
    postSignUpData(userData);

    const profileImgInput = document.getElementById("userProfileImg");
    console.log(profileImgInput);
    if (profileImgInput.files.length > 0) {
      const file = profileImgInput.files[0];
      uploadProfileImage(file);
    }

}