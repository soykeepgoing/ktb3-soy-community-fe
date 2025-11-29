import { getState, clearStore } from "../../core/GlobalStore.js";
import { navigateTo } from "../../core/Router.js";
import { Dropdown } from "../Dropdown/Dropdown.js";
import {logout} from "../../api/userApi.js";

export function HeaderDropdown(){
    return Dropdown({
        placeholder: "🍅", 
        options: [
            ...(getState("userRole") === "ADMIN" ? 
                [{value: "manageMember", label: "회원 관리"}] : 
                [
                    { value: "editProfile", label: "회원 정보 수정" },
                    { value: "editPassword", label: "회원 비밀번호 수정"}
                ]),
            { value: "logout", label: "로그아웃"}
        ],
        className: "header_dropdown",
        clickEvents: {
            editProfile: () => navigateTo("/edit-profile"),
            editPassword: () => navigateTo("/edit-password"),
            logout: () => {
                clearStore();
                logout();
                navigateTo("/")
            }, 
            manageMember:  () => {
                navigateTo("/admin/members")
            }
        }
    });
}