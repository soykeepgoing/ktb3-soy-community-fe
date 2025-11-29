import {getState, setState} from "../core/GlobalStore.js"

export async function loginUser(inputData) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
    });
    return res;
}

export async function logout() {
    const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { 
            "Content-Type": "application/json"
        }
    });
    return res;
}

export async function postSignUpData(userData){
    try{
        const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    setState("userId", data.data.userId);
    console.log("회원가입 성공", data);
  } catch (err) {
    console.error("회원 가입 실패: ", err);
    throw err;
  };
}

export async function uploadProfileImage(file){
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`http://localhost:8080/api/users/me/profile-image`, {
      method: "POST",
      credentials: "include",
      body: formData
    })
    .then(res => {
      if (!res.ok) throw new Error("사용자 프로필 이미지 업로드 실패");
    })
    .then(() => {
      console.log("사용자 프로필 이미지 업데이트 완료:");
      return true;
    })
    .catch(err => console.error(err));
}

export async function uploadNickname(nickname){
    const postData = {
        "userNickname": nickname
    };
    
    return fetch(`http://localhost:8080/api/users/me/profile`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        }).then(res => {
            if(!res.ok) throw new Error("닉네임 변경 실패");
        }).then(() => {
            setState("userNickname", nickname);
            return true;
        }).catch(err => console.error(err));
}

export async function deleteUser(userId){
    try{
        const res = await fetch(`http://localhost:8080/api/users/me`, {
            method: "Delete",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }); 
        if (res.ok){
            console.log("회원 삭제 성공");
        } else {
            console.log("회원 삭제 실패")
        };
    } catch(err){
        console.error("회원 삭제 실패: ", err);
    }
}

export async function patchNewPassword(userId, userOldPassword, userNewPassword){
    try{
        const data = {
                "userOldPassword": userOldPassword.value, 
                "userNewPassword": userNewPassword.value
        };
        console.log(data);
        const res = await fetch(`http://localhost:8080/api/users/me/password`,{
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if(res.ok){
            console.log("회원 비밀번호 변경 성공");
        } else{
            console.log("회원 비밀번호 변경 실패");
        }
    } catch(err){
        console.error("회원 비밀번호 변경 실패: ", err);
    }
}
