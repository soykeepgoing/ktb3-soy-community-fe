import {handleSignUpData} from "../handle/handleSignUpCreate.js";
import {handleProfileImageChanged} from "../handle/handleProfileImageChanged.js"
import { navigateTo } from "../router/router.js";
import {isValidEmailForSignUp, isValidPasswordForSignUp, isValidPasswordCheckForSignUp, isValidNicknameForSignUp} from "../handle/handleSignUpValidation.js";

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
              <img id="userProfileImgPreview" alt="Profile Image" />
          </label>
          <input type="file" id="userProfileImg" accept="image/*" />
        </div>

        <div class="profile-details">
          <label>이메일*</label>
          <input type="email" id="userEmail" placeholder="이메일을 입력하세요">
          <p class="helper-text" id="helper-text-email">* helper text</p>

          <label>비밀번호*</label>
          <input type="password" id="userPassword" placeholder="비밀번호를 입력하세요">
          <p class="helper-text" id="helper-text-pw">* helper text</p>

          <label>비밀번호 확인*</label>
          <input type="password" id="userPasswordCheck" placeholder="비밀번호를 한 번 더 입력하세요">
          <p class="helper-text" id="helper-text-pw-check">* helper text</p>

          <label>닉네임*</label>
          <input type="text" id="userNickname" placeholder="닉네임을 입력하세요">
          <p class="helper-text" id="helper-text-nickname">* helper text</p>
        </div>
    </form>

    <button class="btn-primary" id="btn-signup" disabled>회원가입</button>

    <p class="link" id="link-login">로그인하러 가기</a></p>
  </section>    
  `;

  const paragraph = section.querySelector("#link-login");
  paragraph.onclick = () => navigateTo("/");

  const userEmail = section.querySelector("#userEmail");
  const userPassword = section.querySelector("#userPassword");
  const userPasswordCheck = section.querySelector("#userPasswordCheck");
  const userNickname = section.querySelector("#userNickname");

  const helperTextEmail = section.querySelector("#helper-text-email");
  const helperTextPassword = section.querySelector("#helper-text-pw");
  const helperTextPasswordCheck = section.querySelector("#helper-text-pw-check");
  const helperTextNickname = section.querySelector("#helper-text-nickname");


  const signUpBtn = section.querySelector("#btn-signup"); 

  const userProfileImgInput = section.querySelector("#userProfileImg");
  const userProfileImgInputPreview = section.querySelector("#userProfileImgPreview");

  userProfileImgInput.addEventListener(
    "change", async (e) => {
      const newImageUrl = await handleProfileImageChanged(e);
      userProfileImgInputPreview.src = newImageUrl;}
  );

  let isOkToSend = true;

  userEmail.addEventListener("blur", () => {
    if (!isValidEmailForSignUp(helperTextEmail, userEmail.value)){ isOkToSend = false;}});
  userPassword.addEventListener("blur", () =>{
    if (isValidPasswordForSignUp(helperTextPassword, userPassword.value)){isOkToSend = false;}});
  userPasswordCheck.addEventListener("input", () => {
    if (isValidPasswordCheckForSignUp(helperTextPasswordCheck, userPasswordCheck.value, userPassword.value)){isOkToSend = false;}});
  userNickname.addEventListener("input", () => {
    if (isValidNicknameForSignUp(helperTextNickname, userNickname.value)){isOkToSend = false;}});
  
  if (isOkToSend){
    signUpBtn.disabled = false;
  }

  signUpBtn.addEventListener(
    "click", 
    () => {
      handleSignUpData(userEmail, userPassword, userPasswordCheck, userNickname);
      navigateTo("/");
    } 
  );

  return section;
}
