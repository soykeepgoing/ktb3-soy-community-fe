import { navigateTo } from "../../core/router.js";
import { Dropdown } from "../Dropdown.js";
import { EditPassword } from "../users/EditPassword.js";

export function Header() {
    const header = document.createElement("header");
    header.classList.add("header");
    header.id = "header";

    header.appendChild(HeaderTitle());
    header.appendChild(HeaderDropdown());

    return header;
}

function HeaderTitle(){
    const title = document.createElement("h1");
    title.class = "header__title";
    title.innerHTML = "Dancing Tomato Club";
    return title;
}

function HeaderDropdown(){
    return Dropdown({
        placeholder: "🍅", 
        options: [
            { value: "editProfile", label: "회원 정보 수정" },
            { value: "editPassword", label: "회원 비밀번호 수정"},
            { value: "logout", label: "로그아웃"}
        ],
        className: "topic_dropdown",
        clickEvents: {
            editProfile: () => navigateTo("/edit-profile"),
            editPassword: () => navigateTo("edit-password"),
            logout: () => {
                localStorage.clear();
                navigateTo("/")
            }
        }
    });
}