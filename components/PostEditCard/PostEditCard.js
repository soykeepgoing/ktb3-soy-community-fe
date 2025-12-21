import { h } from "../../core/vdom/h.js";
import { Button } from "../Button/Button.js";

export function PostEditCard({ 
    content,
    imgUrl,
    isButtonDisabled,
    onContentChange,
    onImageChange,
    onButtonClicked,
 }){
    return h("form", 
        {className: "post-edit-card"},
        h("div", { className: "image-upload-container" },
            h("label", {}, "이미지"), 
            imgUrl && h("img", { src: imgUrl, className: "preview-img" }),
            h("input", {type: "file", accept: "image/*", onChange: onImageChange}), 
        ),
        h("label",{}, "내용 *"),
        h("textarea", { value: content ?? "", onInput: onContentChange }),
        Button({
            disabled: isButtonDisabled,
            onClick: onButtonClicked, 
            text: "Edit Post"
        })

    )
}
