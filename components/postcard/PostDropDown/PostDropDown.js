import { Dropdown } from "../../Dropdown/Dropdown.js";

export function PostDropDown({isOpen, onToggle, clickEvents}){
    return Dropdown({
        className: "post-drop-down",
        placeholder: "⋯", 
        options: [
            {value: "edit", label: "수정"},
            {value: "delete", label: "삭제"}
        ],
        isOpen, 
        onToggle, 
        clickEvents
    })
}