export function Header(){
    const header = document.createElement("header");
    header.classList.add("header");
    header.innerHTML = `
        <h1 class="title">아무 말 대잔치</h1>
        <div class="user-profile" id="user-profile">
        <div class="dropdown">
            <img class="profile-img" id="profile-img" src="/../images/default_user_profile.png" alt="프로필 이미지" />
            <ul class="menu">
            <li id="edit-user-profile">회원 정보 수정</li>
            <li id="edit-user-password">비밀번호 수정</li>
            <li id="delete-user">회원 정보 삭제</li>
            </ul>
        </div>
        </div>
    `;
    return header;
}