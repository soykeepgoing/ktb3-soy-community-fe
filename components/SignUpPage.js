import {handleSignUpData} from "../handle/handleSignUpData.js";

export function SignUpPage(){
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
      </form>
      <button class="btn-primary" id="btn-signup">회원가입</button>

      <p class="link">로그인하러 가기</a></p>
    </section>    
    `;

    const userEmail = section.querySelector("#userEmail");
    const userPassword = section.querySelector("#userPassword");
    const userPasswordCheck = section.querySelector("#userPasswordCheck");
    const userNickname = section.querySelector("#userNickname");
    const signUpBtn = section.querySelector("#btn-signup"); 

    signUpBtn.addEventListener(
      "click", 
      () => handleSignUpData(userEmail, userPassword, userPasswordCheck, userNickname)
    );

    return section;
}
