export function SignUp(){
    const section = document.createElement("section");
    section.className = "signup-box";

    section.innerHTML = `

    <form class="signup__form">
        <label class="signup__label">Profile Image</label>
        <p class="helper-text"></p>
        
        <div class="signup__profile-img">
          <label for="userProfileImg" class="signup__profile-img-preview">
              <img class="signup__profile-img-tag" id="userProfileImgPreview" alt="Profile Image" src="../../images/default_user_profile.png" />
          </label>
          <input type="file" class="signup__profile-file" id="userProfileImg" accept="image/*" />
        </div>

        <div class="signup__field">
            <label class="signup__label">Email*</label>
            <input class="signup__input" type="email" id="userEmail" placeholder="이메일을 입력하세요">
            <p class="helper-text" id="helper-text-email"></p>
        </div>

        <div class="signup__field">
            <label class="signup__label">Password*</label>
            <input class="signup__input" type="password" id="userPassword" placeholder="비밀번호를 입력하세요">
            <p class="helper-text" id="helper-text-pw"></p>
        </div>

        <div class="signup__field">
            <label class="signup__label">Password check*</label>
            <input class="signup__input" type="password" id="userPasswordCheck" placeholder="비밀번호를 한 번 더 입력하세요">
            <p class="helper-text" id="helper-text-pw-check"></p>
        </div>

        <div class="signup__field">
            <label class="signup__label">Nickname*</label>
            <input class="signup__input" type="text" id="userNickname" placeholder="닉네임을 입력하세요">
            <p class="helper-text" id="helper-text-nickname"></p>
        </div>


    </form>

    <button class="signup__btn" id="signup__btn" disabled>Join us!</button>

    <p class="link_to" id="signup__login_link_to">Already a member? Sign in</a></p>
  `;
  return section;
}