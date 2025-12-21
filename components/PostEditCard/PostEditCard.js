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
        {},
        h("label", {}, "내용 *"),
        h("textarea", { value: content ?? "", onInput: onContentChange }),
        h("div", {},
            h("label", {}, "이미지"), 
            imgUrl && h("img", { src: imgUrl}),
            h("input", {type: "file", accept: "image/*", onChange: onImageChange}), 
        ),
        Button({
            disabled: isButtonDisabled,
            onClick: onButtonClicked, 
            text: "Edit Post"
        })

    )
}
