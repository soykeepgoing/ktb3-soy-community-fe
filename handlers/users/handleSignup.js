export async function handleSignUp({email, password, nickname, profileImg}){
    const formData = new FormData();

    const userData = {
        userEmail: email, 
        userPassword: password,
        userNickname: nickname
    };

    formData.append(
        "data",
        new Blob([JSON.stringify(userData)], { type: "application/json" })
    );

    if(profileImg){
        formData.append("profileImage", profileImgInput.files[0]);
    }

    const response = await signUp(formData);

    if (response.success){
        setState("userId", response.data.userId);
        setState("isLogin", "false");
    }

    return response; 
}