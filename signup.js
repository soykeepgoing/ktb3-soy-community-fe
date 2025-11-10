const userData = {};

const signUpBtn = document.getElementById("btn-signup");
signUpBtn.addEventListener("click", postSignUpData);

function isNotValidPassword(userPassword, userPasswordCheck){
    return userPassword == userPasswordCheck;
}

async function postSignUpData(){
  event.preventDefault();
  const userEmail = document.getElementById("userEmail").value;
  const userPassword = document.getElementById("userPassword").value;
  const userPasswordCheck = document.getElementById("userPasswordCheck").value;
  const userNickname = document.getElementById("userNickname").value;
  
  if(!isNotValidPassword(userPassword, userPasswordCheck)){
    return;
  }

  userData.userEmail = userEmail;
  userData.userPassword = userPassword;
  userData.userNickname = userNickname;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  };

  fetch("http://localhost:8080/api/users", options)
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("userId", data.data.userId);
    const profileImgInput = document.getElementById("userProfileImg");
    if (profileImgInput.files.length > 0) {
      const file = profileImgInput.files[0];
      uploadProfileImage(data.data.userId, file);
    }
    console.log("회원가입 성공:", data);
  }).catch(
    err => console.error("회원가입 실패: ", err));
}

function uploadProfileImage(userId, file) {
  const formData = new FormData();
  formData.append("file", file);

  fetch(`http://localhost:8080/api/users/profile?userId=${userId}`, {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("이미지 업로드 실패");
      return res.json();
    })
    .then(data => {
      console.log("이미지 업데이트 완료:", data);
      localStorage.setItem("userProfileImg", data.profileImgUrl);
    })
    .catch(err => console.error(err));
}
