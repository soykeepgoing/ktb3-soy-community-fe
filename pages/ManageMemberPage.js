import { FloatingButton } from "../components/FloatingButton/FloatingButton.js";
import { loadAllUserTable } from "../handle/admin/AdminEventHandler.js";

export function ManageMemberPage(){
    const section = document.createElement("section");
    section.classList.add("manageMemberPage");
    section.innerHTML = `<h1>전체 회원 관리 페이지</h1>`;
    loadAllUserTable(section);

    const floatingBtn = FloatingButton({value: "🏠", url: "/posts"});
    section.appendChild(floatingBtn);

    return section;
}
