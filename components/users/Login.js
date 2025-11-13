export function Login(){
    const section = document.createElement("section");
    section.className = "login-box";
    section.innerHTML = `
        <h2 class = "login-box-title">로그인</h2>
        <form>
            <label>이메일</label>
            <input type="email" id = "user-email" placeholder="이메일을 입력하세요">
            <label>비밀번호</label>
            <input type="password" id = "user-password" placeholder="비밀번호를 입력하세요">
            <p class="helper-text" id="helper-text">* helper text</p>
            <button class="btn-primary" id = "btn-login" disabled>로그인</button>
        </form>
    `;
    return section;
}