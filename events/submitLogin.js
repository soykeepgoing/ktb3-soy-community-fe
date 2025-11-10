import { loginUser } from "../api/userApi.js"


export async function submitLogin(event){
    event.preventDefault();

    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    const helperText = document.querySelector("#helperText");
    
    const userData = {
        "userEmail": email, 
        "userPassword": password
    };

    try{
        const response = await loginUser(userData);
        
        if(!response.ok){
            
            helperText.textContent = "아이디 또는 비밀번호를 확인해주세요.";
            helperText.className = "helper-text show";   
            return;
        }
        
        const data = await response.json();
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("userProfileImg", data.data.userProfileImgUrl);
    } catch(err){
        console.log("로그인 실패: " + err);
    }
};