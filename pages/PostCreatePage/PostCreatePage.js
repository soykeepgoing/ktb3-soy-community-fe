import { h } from "../../core/vdom/h.js";

import { PostCreateSection } from "../../components/PostCreateSection/PostCreateSection.js";
import { TopicDropdown } from "../../components/TopicDropdown/TopicDropdown.js";
import { Button } from "../../components/Button/Button.js";
import { useState } from "../../core/hooks/useState.js";

export function PostCreatePage(){
    const [selectedTopic, setSelectedTopic] = useState(undefined);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleToggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleSelect = (value) => {
        setSelectedTopic(value);
        setDropdownOpen(false);
    }

    return h("div", {className: "post-create-page"}, 
        h(TopicDropdown, {
            selectedTopic, 
            isOpen: dropdownOpen, 
            onToggle: handleToggle, 
            clickEvents: {
                "food": () => handleSelect("food"), 
                "purchase": () => handleSelect("purchase"),
                "contents": () => handleSelect("contents"), 
                "music": () => handleSelect("music"),
                "activity": () => handleSelect("activity")
            }}),
        PostCreateSection(),
        Button({
            text: "작성 완료",
            disabled: false, 
            onClick: () => console.log("hi")
        }), 
    );
}