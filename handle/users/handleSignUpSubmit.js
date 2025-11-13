import { postSignUpData, uploadProfileImage } from "../../api/userApi.js";

export async function handleSignUpSubmit(userEmail, userPassword, userPasswordCheck, userNickname){
    const email = userEmail.value;
    const password = userPassword.value;
    const passwordCheck = userPasswordCheck.value;
    const nickname = userNickname.value;
    const userData = {
        userEmail: email,
        userPassword: password,
        userNickname: nickname
    };
    
    await postSignUpData(userData);

    const profileImgInput = document.getElementById("userProfileImg");
    if (profileImgInput && profileImgInput.files.length > 0) {
      const file = profileImgInput.files[0];
      await uploadProfileImage(file);
    }

}
