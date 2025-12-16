import { h } from "../../core/vdom/h.js";
import { useState } from "../../core/hooks/useState.js";

import { PostCreateSection } from "../../components/PostCreateSection/PostCreateSection.js";
import { TopicDropdown } from "../../components/TopicDropdown/TopicDropdown.js";
import { Button } from "../../components/Button/Button.js";
import { FloatingButton } from "../../components/FloatingButton/FloatingButton.js";
import { handleCreatePost } from "../../handlers/posts/handleCreatePost.js";
import { handleImageChanged } from "../../handlers/handleImageChanged.js";
import { router } from "../../main.js";

export function PostCreatePage(){
    const [selectedTopic, setSelectedTopic] = useState(undefined);
    const [postContent, setPostContent] = useState("");
    const [postImageFile, setPostImageFile] = useState(null);
    const [helperText, setHelperText] = useState("내용을 입력해주세요.");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleToggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleSelect = (value) => {
        setSelectedTopic(value);
        setDropdownOpen(false);
    }

    const handleContentChange = (value) => {
        setPostContent(value);
        const isEmpty = value.trim() === "";
        setHelperText(isEmpty ? "내용을 입력해주세요." : "");
    };

    const handleImageChange = async (e) => {
        const { file } = await handleImageChanged(e);
        setPostImageFile(file ?? null);
    };

    const handleSubmit = async () => {
        const res = await handleCreatePost({
            topicCode: selectedTopic,
            postContent,
            postImageFile
        });

        if (res?.success){
            router.navigate("/posts");
        }
    };

    const isSubmitDisabled = !selectedTopic || postContent.trim() === "";

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
        PostCreateSection({
            content: postContent,
            helperText,
            onContentChange: handleContentChange,
            onImageChange: handleImageChange
        }),
        Button({
            text: "작성 완료",
            disabled: isSubmitDisabled, 
            onClick: async () => {
                await handleSubmit();
            }
        }), 
        FloatingButton({value: "🏠", url: "/posts"})
    );
}
