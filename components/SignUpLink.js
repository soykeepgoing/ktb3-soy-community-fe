import { navigateTo } from "../router/router.js";

export function SignUpLink(){
    const paragraph = document.createElement("p");
    paragraph.className = "link";

    paragraph.innerHTML = `
        <a id="link-sign-up">회원가입 하러가기</a>
    `

    paragraph.onclick = () => navigateTo("/signup");
    return paragraph;
}