export function EditProfile(){
    const section = document.createElement("section");
    section.className = "edit-profile-box";
    section.innerHTML = `
        <h2>회원 정보 수정</h2>
        <label>프로필 사진</label>
        <div class="profile-img">
          <label for="userProfileImg" class="profile-img-preview">
              <img id="userProfileImgPreview" alt="Profile Image" src=${localStorage.getItem("userProfileImg")} />
          </label>
          <input type="file" id="userProfileImg" accept="image/*" />
        </div>

        <div class="profile-details">
          <label>이메일*</label>
          <p id="email-info">${localStorage.getItem("userEmail")}</p>
          <p class="helper-text" id="helper-text-email">* helper text</p>

          <label>닉네임*</label>
          <form>
          <input type="text" id="user-nickname" placeholder="닉네임을 입력하세요">
          </form>
          <p class="helper-text" id="helper-text-nickname">* helper text</p>
        </div>
        <button class="btn-primary" id="btn-edit">수정하기</button>
        <p class="link" id="link-user-delete">회원 탈퇴</a></p>
        <div class="toast" id="toast"></div>
        `;
    return section;
}