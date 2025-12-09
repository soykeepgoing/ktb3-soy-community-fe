import { Dropdown } from "../Dropdown/Dropdown.js";

export function TopicDropdown(){
    return Dropdown({
        className: "topic-dropdown",
        placeholder: "오늘 칭찬할 일 찾기 ▾",
        options: [
            { value: "food", label: "#한입의기쁨" },
            { value: "purchase", label: "#득템로그" },
            { value: "contents", label: "#인생콘텐츠" },
            { value: "music", label: "#듣는마약" },
            { value: "activity", label: "#피지컬파워" }
        ],
    })
}