export function SignUp(){
    const section = document.createElement("section");
    section.className = "signup-box";

    section.innerHTML = `
          <h2>회원가입</h2>

      <form>
        <label>프로필 사진</label>
        <p class="helper-text">* helper text</p>
        <div class="profile-img">
          <label for="userProfileImg" class="profile-img-preview">
              <img id="userProfileImgPreview" src="../images/default_profile.png" alt="Profile Image" />
          </label>
          <input type="file" id="userProfileImg" accept="image/*" />
        </div>

        <div class="profile-details">
          <label>이메일*</label>
          <input type="email" id="userEmail" placeholder="이메일을 입력하세요">
          <p class="helper-text">* helper text</p>

          <label>비밀번호*</label>
          <input type="password" id="userPassword" placeholder="비밀번호를 입력하세요">
          <p class="helper-text">* helper text</p>

          <label>비밀번호 확인*</label>
          <input type="password" id="userPasswordCheck" placeholder="비밀번호를 한 번 더 입력하세요">
          <p class="helper-text">* helper text</p>

          <label>닉네임*</label>
          <input type="text" id="userNickname" placeholder="닉네임을 입력하세요">
          <p class="helper-text">* helper text</p>
        </div>
        <button class="btn-primary" id="btn-signup">회원가입</button>
      </form>

      <p class="link">로그인하러 가기</a></p>
    </section>    
    `;

    return section;
}
//     const userData = {};

// const signUpBtn = document.getElementById("btn-signup");
// signUpBtn.addEventListener("click", postSignUpData);

// function isNotValidPassword(userPassword, userPasswordCheck){
//     return userPassword == userPasswordCheck;
// }

// async function postSignUpData(){
//   event.preventDefault();
//   const userEmail = document.getElementById("userEmail").value;
//   const userPassword = document.getElementById("userPassword").value;
//   const userPasswordCheck = document.getElementById("userPasswordCheck").value;
//   const userNickname = document.getElementById("userNickname").value;
  
//   if(!isNotValidPassword(userPassword, userPasswordCheck)){
//     return;
//   }

//   userData.userEmail = userEmail;
//   userData.userPassword = userPassword;
//   userData.userNickname = userNickname;

//   const options = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData)
//   };

//   fetch("http://localhost:8080/api/users", options)
//   .then(res => res.json())
//   .then(data => {
//     localStorage.setItem("userId", data.data.userId);
//     const profileImgInput = document.getElementById("userProfileImg");
//     if (profileImgInput.files.length > 0) {
//       const file = profileImgInput.files[0];
//       uploadProfileImage(data.data.userId, file);
//     }
//     console.log("회원가입 성공:", data);
//   }).catch(
//     err => console.error("회원가입 실패: ", err));
// }

// function uploadProfileImage(userId, file) {
//   const formData = new FormData();
//   formData.append("file", file);

//   fetch(`http://localhost:8080/api/users/profile?userId=${userId}`, {
//     method: "POST",
//     body: formData
//   })
//     .then(res => {
//       if (!res.ok) throw new Error("이미지 업로드 실패");
//       return res.json();
//     })
//     .then(data => {
//       console.log("이미지 업데이트 완료:", data);
//       localStorage.setItem("userProfileImg", data.profileImgUrl);
//     })
//     .catch(err => console.error(err));
// }
// }