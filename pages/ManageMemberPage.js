import { FloatingButton } from "../components/FloatingButton/FloatingButton.js";
import { loadAllUserTable } from "../handle/admin/AdminEventHandler.js";

export function ManageMemberPage(){
    const div = document.createElement("div");
    div.innerText = "관리자 페이지";
    
    loadAllUserTable(div);

    const floatingBtn = FloatingButton({value: "🏠", url: "/posts"});

    div.appendChild(floatingBtn);
    return div;
}
