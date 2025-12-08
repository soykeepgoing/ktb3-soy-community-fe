import { editPassword } from "../../../api/userApi.js";
import { Dropdown } from "../../Dropdown/Dropdown.js";

export function HeaderDropDown(){
    return Dropdown({
        className: "header_dropdown",
        placeholder: "🍅", 
        showMenu: false,
        options: [
            {value: "editProfile", label: "회원 정보 수정"}, 
            {value: "editPassword", label: "회원 비밀번호 수정"},
            {value: "logout", label: "로그아웃"}
        ], 
        clickEvents : {
            editProfile: () => {console.log("Click Edit Profile");}, 
            editPassword: () => {console.log("Click Edit Password")}, 
            logout: () => {console.log("Logout")}
        }, 
        
    })
}