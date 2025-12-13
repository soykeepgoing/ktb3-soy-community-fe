import { editPassword } from "../../../api/userApi.js";
import { Dropdown } from "../../Dropdown/Dropdown.js";
import { useState } from "../../../core/hooks/useState.js";
import { router } from "../../../main.js";

export function HeaderDropDown(){
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleToggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return Dropdown({
        className: "header_dropdown",
        placeholder: "🍅", 
        options: [
            {value: "editProfile", label: "회원 정보 수정"}, 
            {value: "editPassword", label: "회원 비밀번호 수정"},
            {value: "logout", label: "로그아웃"}
        ], 
        isOpen: dropdownOpen,
        onToggle: handleToggle, 
        clickEvents : {
            editProfile: () => {router.navigate("/edit/profile")}, 
            editPassword: () => {console.log("Click Edit Password")}, 
            logout: () => {console.log("Logout")}
        }, 
        
    })
}