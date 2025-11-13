export async function loginUser(userData) {
  return await fetch("http://localhost:8080/api/users/auth", {
    method: "POST",
    headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
}

export async function postSignUpData(userData){
    try{
        const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    localStorage.setItem("userId", data.data.userId);
    console.log("회원가입 성공", data);
  } catch (err) {
    console.error("회원 가입 실패: ", err);
    throw err;
  };
}

export async function uploadProfileImage(file){
  const formData = new FormData();
  formData.append("file", file);
  const userId = localStorage.getItem("userId");
  try{
    const res = await fetch(`http://localhost:8080/api/users/${userId}/profile`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    localStorage.setItem("userProfileImg", data.profileImgUrl);
    console.log("사용자 프로필 이미지 업로드 성공");
  } catch (err) {
    console.log("사용자 프로필 이미지 업로드 실패 : ", err);
  }
}

export async function uploadNickname(nickname){
    const userId = localStorage.getItem("userId");
    const postData = {
        "userNickname": nickname
    };

    try{
        const res = await fetch(`http://localhost:8080/api/users/${userId}/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        });

        const data = await res.json();
        console.log("닉네임 변경 성공");
    } catch(err){
        console.err("닉네임 변경 실패:", err);
    }
}

export async function deleteUser(userId){
    try{
        const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: "Delete",
            headers: { "Content-Type": "application/json" },
        }); 
        if (res.ok){
            console.log("회원 삭제 실패");
        }
        console.log("회원 삭제 성공");
    } catch(err){
        console.error("회원 삭제 실패: ", err);
    }
}