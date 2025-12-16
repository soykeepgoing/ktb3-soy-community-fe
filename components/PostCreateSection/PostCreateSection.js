import { h } from "../../core/vdom/h.js";
import { HelperText } from "../HelperText/HelperText.js";

export function PostCreateSection({
    content,
    helperText,
    onContentChange,
    onImageChange
}){
    return h(
        "form", 
        {className: "post-create"}, 
        h("label", {}, "내용*"), 
        h("textarea", {
            placeholder: "내용을 입력해주세요.",
            value: content,
            onInput: (e) => onContentChange(e.target.value)
        }), 
        HelperText({
            text: helperText, 
            invalid: Boolean(helperText)
        }), 
        h("label", {}, "이미지"), 
        h("input", {type: "file", accept: "image/*", onChange: onImageChange}), 
    );
}
